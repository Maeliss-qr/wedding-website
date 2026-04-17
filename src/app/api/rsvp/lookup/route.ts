import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const firstName = typeof body.firstName === "string" ? body.firstName.trim() : "";

    if (!firstName) {
      return NextResponse.json({ error: "Prénom requis" }, { status: 400 });
    }

    const guests = await prisma.guest.findMany({
      where: {
        firstName: { contains: firstName, mode: "insensitive" },
      },
      include: {
        family: {
          include: { guests: { orderBy: { firstName: "asc" } } },
        },
      },
    });

    return NextResponse.json({ guests });
  } catch (err) {
    console.error("[rsvp/lookup]", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
