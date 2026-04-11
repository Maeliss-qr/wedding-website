import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdminToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;

  if (!verifyAdminToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const guests = await prisma.guest.findMany({
    orderBy: { createdAt: "desc" },
    include: { family: true },
  });

  return NextResponse.json({ guests });
}
