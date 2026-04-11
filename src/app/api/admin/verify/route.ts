import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual, createHmac } from "crypto";

function signToken(value: string): string {
  const secret = process.env.COOKIE_SECRET ?? "fallback-secret";
  const hmac = createHmac("sha256", secret);
  hmac.update(value);
  return `${value}.${hmac.digest("hex")}`;
}

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  const adminPassword = process.env.ADMIN_PASSWORD ?? "";

  if (!password || !adminPassword) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const a = Buffer.from(password.padEnd(64));
  const b = Buffer.from(adminPassword.padEnd(64));

  const match = a.length === b.length && timingSafeEqual(a, b);

  if (!match) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = signToken("admin-authenticated");
  const response = NextResponse.json({ success: true });
  response.cookies.set("admin_token", token, {
    httpOnly: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
  });

  return response;
}

export function verifyAdminCookie(req: NextRequest): boolean {
  const token = req.cookies.get("admin_token")?.value;
  if (!token) return false;

  const secret = process.env.COOKIE_SECRET ?? "fallback-secret";
  const [value, signature] = token.split(".");
  if (!value || !signature) return false;

  const expected = createHmac("sha256", secret).update(value).digest("hex");

  try {
    return timingSafeEqual(Buffer.from(signature, "hex"), Buffer.from(expected, "hex"));
  } catch {
    return false;
  }
}
