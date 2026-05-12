import jwt from "jsonwebtoken";
import { headers } from "next/headers";
import { isBlacklisted } from "@/lib/auth/tokenBlacklist";

export type DecodedToken = { email: string; exp: number; isGuest?: boolean; name?: string };

export async function verifyToken(): Promise<DecodedToken> {
  const headersList = await headers();
  const authorization = headersList.get("authorization");

  if (!authorization) throw new Error("Missing authorization token");

  const token = authorization.replace("Bearer ", "");

  if (isBlacklisted(token)) throw new Error("Token revoked");

  const secret = process.env.SECRET_KEY as string;
  return jwt.verify(token, secret) as DecodedToken;
}
