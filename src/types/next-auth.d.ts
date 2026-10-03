/* eslint-disable */
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id?: string;
    name?: string;
    email?: string;
    accessToken?: string;
  }
  interface Session {
    id?: string;
    routeToken?: string;
    user: {
      name?: string;
      email?: string;
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    routeToken?: string;
    id?: string;
  }
}
