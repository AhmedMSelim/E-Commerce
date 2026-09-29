import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getMyToken() {
  const cookieStore = await cookies();

  const allCookies = cookieStore.getAll();

  console.log(
    "AUTH COOKIES:",
    allCookies.map((c) => ({
      name: c.name,
      hasValue: !!c.value,
    })),
  );

  const myToken =
    cookieStore.get("__Secure-next-auth.session-token")?.value ??
    cookieStore.get("next-auth.session-token")?.value ??
    cookieStore.get("__Secure-authjs.session-token")?.value ??
    cookieStore.get("authjs.session-token")?.value;

  console.log("SESSION COOKIE FOUND:", !!myToken);

  if (!myToken) {
    return null;
  }

  const decodedToken = await decode({
    token: myToken,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  console.log("DECODED JWT HAS ROUTE TOKEN:", !!decodedToken?.routeToken);

  return decodedToken?.routeToken ?? null;
}
