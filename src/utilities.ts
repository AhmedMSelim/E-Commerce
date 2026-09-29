import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getMyToken() {
  try {
    const cookieStore = await cookies();

    const myToken =
      cookieStore.get("__Secure-next-auth.session-token")?.value ??
      cookieStore.get("next-auth.session-token")?.value ??
      cookieStore.get("__Secure-authjs.session-token")?.value ??
      cookieStore.get("authjs.session-token")?.value;

    if (!myToken) return null;

    const secret = process.env.NEXTAUTH_SECRET || "";

    if (!secret) {
      return myToken;
    }

    const decoded = await decode({
      token: myToken,
      secret: secret,
    });

    if (decoded && typeof decoded === "object") {
      return (
        (decoded.token as string) || (decoded.rawToken as string) || myToken
      );
    }

    return myToken;
  } catch (error) {
    console.error("JWT Decryption Error:", error);
    return null;
  }
}
