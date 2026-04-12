import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdminToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;
  if (!verifyAdminToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const text = await req.text();
  const lines = text.split(/\r?\n/).filter((l) => l.trim());

  if (lines.length < 2) {
    return NextResponse.json({ error: "CSV vide ou sans données" }, { status: 400 });
  }

  // Parse header to find column indices
  const header = lines[0].split(",").map((h) => h.trim().toLowerCase().replace(/[""]/g, ""));
  const idxFirst = header.findIndex((h) => h === "prénom" || h === "prenom" || h === "firstname");
  const idxLast = header.findIndex((h) => h === "nom" || h === "lastname");
  const idxFamily = header.findIndex((h) => h === "famille" || h === "family");

  if (idxFirst === -1 || idxLast === -1) {
    return NextResponse.json(
      { error: "Colonnes requises manquantes : Prénom, Nom" },
      { status: 400 }
    );
  }

  let created = 0;
  let updated = 0;
  let errors = 0;

  for (const line of lines.slice(1)) {
    const cols = line.split(",").map((c) => c.trim().replace(/^[""]|[""]$/g, ""));
    const firstName = cols[idxFirst]?.trim();
    const lastName = cols[idxLast]?.trim();
    const familyName = idxFamily !== -1 ? cols[idxFamily]?.trim() : undefined;

    if (!firstName || !lastName) {
      errors++;
      continue;
    }

    try {
      let familyId: number | null = null;

      if (familyName) {
        const family = await prisma.family.upsert({
          where: { name: familyName },
          update: {},
          create: { name: familyName },
        });
        familyId = family.id;
      }

      const existing = await prisma.guest.findUnique({
        where: { firstName_lastName: { firstName, lastName } },
      });

      if (existing) {
        await prisma.guest.update({
          where: { id: existing.id },
          data: { familyId },
        });
        updated++;
      } else {
        await prisma.guest.create({
          data: { firstName, lastName, familyId },
        });
        created++;
      }
    } catch {
      errors++;
    }
  }

  return NextResponse.json({ created, updated, errors });
}
