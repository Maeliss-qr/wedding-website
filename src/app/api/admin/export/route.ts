import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdminToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;

  if (!verifyAdminToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const guests = await prisma.guest.findMany({
    orderBy: { createdAt: "asc" },
    include: { family: true },
  });

  const headers = ["ID", "Famille", "Prénom", "Nom", "Présent", "Menu", "Régime alimentaire", "Brunch", "Message", "Date de réponse"];

  const rows = guests.map((g) => {
    const brunch = g.family ? g.family.attendsBrunch : g.attendsBrunch;
    const msg = g.family ? g.family.message : g.message;
    return [
      g.id,
      g.family?.name ?? "",
      g.firstName,
      g.lastName,
      g.attending === true ? "Oui" : g.attending === false ? "Non" : "En attente",
      g.mealPreference ?? "",
      g.dietaryRestrictions ?? "",
      brunch === true ? "Oui" : brunch === false ? "Non" : "",
      msg ?? "",
      g.createdAt.toISOString(),
    ];
  });

  const csv = [headers, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
    .join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="invites-${new Date().toISOString().split("T")[0]}.csv"`,
    },
  });
}
