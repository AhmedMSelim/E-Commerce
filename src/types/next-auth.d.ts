/* eslint-disable */
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id?: string;
    name: string;
    email: string;
    accessToken?: string;
  }
  interface Session {
    user: {
      name: string;
      email: string;
    };
    expires: string;
    id: string;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    routeToken?: string;
    id?: string;
  }
}
