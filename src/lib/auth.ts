import { createHmac, timingSafeEqual } from "crypto";

export function verifyAdminToken(token: string | undefined): boolean {
  if (!token) return false;

  const secret = process.env.COOKIE_SECRET ?? "fallback-secret";
  const lastDot = token.lastIndexOf(".");
  if (lastDot === -1) return false;

  const value = token.slice(0, lastDot);
  const signature = token.slice(lastDot + 1);

  const expected = createHmac("sha256", secret).update(value).digest("hex");

  try {
    return timingSafeEqual(Buffer.from(signature, "hex"), Buffer.from(expected, "hex"));
  } catch {
    return false;
  }
}
