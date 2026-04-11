import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { normalizeName } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const firstName = typeof body.firstName === "string" ? body.firstName : "";
    const lastName = typeof body.lastName === "string" ? body.lastName : "";

    if (!firstName || !lastName) {
      return NextResponse.json({ error: "Prénom et nom requis" }, { status: 400 });
    }

    const firstNameNorm = normalizeName(firstName);
    const lastNameNorm = normalizeName(lastName);

    const allGuests = await prisma.guest.findMany({
      include: {
        family: {
          include: { guests: { orderBy: { firstName: "asc" } } },
        },
      },
    });

    const guests = allGuests.filter(
      (g) =>
        normalizeName(g.firstName).includes(firstNameNorm) &&
        normalizeName(g.lastName).includes(lastNameNorm)
    );

    return NextResponse.json({ guests });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
