import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { rsvpSchema } from "@/lib/schemas/rsvp";
import { normalizeName } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = rsvpSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const firstNameNorm = normalizeName(data.firstName);
    const lastNameNorm = normalizeName(data.lastName);

    const guest = await prisma.guest.upsert({
      where: {
        firstName_lastName: {
          firstName: data.firstName,
          lastName: data.lastName,
        },
      },
      update: {
        attending: data.attending,
        mealPreference: data.attending ? (data.mealPreference ?? null) : null,
        firstNameNorm,
        lastNameNorm,
      },
      create: {
        firstName: data.firstName,
        lastName: data.lastName,
        firstNameNorm,
        lastNameNorm,
        attending: data.attending,
        mealPreference: data.attending ? (data.mealPreference ?? null) : null,
      },
    });

    return NextResponse.json({ success: true, guest }, { status: 200 });
  } catch (error) {
    console.error("RSVP error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const firstName = searchParams.get("first");
  const lastName = searchParams.get("last");

  if (!firstName || !lastName) {
    return NextResponse.json({ error: "first and last params required" }, { status: 400 });
  }

  const guest = await prisma.guest.findUnique({
    where: { firstName_lastName: { firstName, lastName } },
    include: { family: true },
  });

  return NextResponse.json({ guest: guest ?? null }, { status: 200 });
}
