import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type GuestResponse = {
  id: number;
  attending: boolean;
  mealPreference?: string | null;
  dietaryRestrictions?: string | null;
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const guestId: number = body.guestId;
    const responses: GuestResponse[] = body.responses;
    const attendsBrunch: boolean | null = body.attendsBrunch ?? null;
    const message: string | null = body.message ?? null;

    if (!guestId || !Array.isArray(responses) || responses.length === 0) {
      return NextResponse.json({ error: "Données invalides" }, { status: 400 });
    }

    const requester = await prisma.guest.findUnique({ where: { id: guestId } });
    if (!requester) {
      return NextResponse.json({ error: "Session invalide, veuillez recommencer." }, { status: 400 });
    }

    if (requester.familyId !== null) {
      const familyGuests = await prisma.guest.findMany({
        where: { familyId: requester.familyId },
        select: { id: true },
      });
      const validIds = new Set(familyGuests.map((g) => g.id));
      if (!responses.every((r) => validIds.has(r.id))) {
        return NextResponse.json({ error: "Accès refusé." }, { status: 403 });
      }
    } else {
      if (responses.length !== 1 || responses[0].id !== guestId) {
        return NextResponse.json({ error: "Accès refusé." }, { status: 403 });
      }
    }

    // Update each guest's attendance and meal
    await Promise.all(
      responses.map((r) =>
        prisma.guest.update({
          where: { id: r.id },
          data: {
            attending: r.attending,
            mealPreference: r.attending ? (r.mealPreference ?? null) : null,
            dietaryRestrictions: r.attending ? (r.dietaryRestrictions ?? null) : null,
          },
        })
      )
    );

    // Save brunch + message on Family or Guest
    if (requester.familyId !== null) {
      await prisma.family.update({
        where: { id: requester.familyId },
        data: { attendsBrunch, message },
      });
    } else {
      await prisma.guest.update({
        where: { id: guestId },
        data: { attendsBrunch, message },
      });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
