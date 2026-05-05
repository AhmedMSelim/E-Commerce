// Gate Between Client & Server

import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const protectedRoutes = [
    "/cart",
    "/widhlist",
    "/checkout",
    "/allorders",
    "/profile",
  ];
  const authRouts = ["/login", "/register"];
  const myPath = request.nextUrl.pathname;

  const myToken = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });
  const token = myToken?.routeToken;
  if (!token && protectedRoutes.some((path) => myPath.startsWith(path))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (token && authRouts.some((path) => myPath.startsWith(path))) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/cart/:path*",
    "/widhlist/:path*",
    "/checkout/:path*",
    "/allorders/:path*",
    "/profile/:path*",
    "/login",
    "/register",
  ],
};
