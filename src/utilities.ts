import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getMyToken() {
  const cookieStore = await cookies();

  // جرب الاسمين: العادي والـ Secure اللي على Vercel
  const myToken =
    cookieStore.get("__Secure-next-auth.session-token")?.value ||
    cookieStore.get("next-auth.session-token")?.value;

  if (!myToken) return null;

  try {
    const decodedToken = await decode({
      token: myToken,
      secret: process.env.NEXTAUTH_SECRET!,
    });
    return decodedToken?.routeToken || null;
  } catch (e) {
    console.log("DECODE FAILED:", e);
    return null;
  }
}
