import { cookies } from "next/headers";

export async function getMyToken() {
  const cookie = await cookies();
  // قراءة التوكن مباشرة كـ Plain Text من الـ Cookies
  const token =
    cookie.get("userToken")?.value ||
    cookie.get("__Secure-next-auth.session-token")?.value;

  return token;
}
