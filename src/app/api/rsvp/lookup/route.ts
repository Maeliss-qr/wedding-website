import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const firstName = typeof body.firstName === "string" ? body.firstName.trim() : "";

    if (!firstName) {
      return NextResponse.json({ error: "Prénom requis" }, { status: 400 });
    }

    const matches = await prisma.$queryRaw<{ id: number }[]>`
      SELECT id FROM "Guest"
      WHERE normalize_name("firstName") LIKE '%' || normalize_name(${firstName}) || '%'
    `;

    const guests = await prisma.guest.findMany({
      where: { id: { in: matches.map((r) => r.id) } },
      include: {
        family: {
          include: { guests: { orderBy: { firstName: "asc" } } },
        },
      },
    });

    return NextResponse.json({ guests });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
