// Configuration of Nextauth
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      name: "myLogin",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await fetch(
            `https://ecommerce.routemisr.com/api/v1/auth/signin`,
            {
              method: "POST",
              body: JSON.stringify({
                email: credentials?.email,
                password: credentials?.password,
              }),
              headers: { "content-type": "application/json" },
            }
          );

          const result = await res.json();
          if (!res.ok) throw new Error(result.message);

          const jwt: { id: string } = jwtDecode(result.token);

          return {
            id: jwt.id,
            name: result.user.name,
            email: result.user.email,
            accessToken: result.token,
          };
        } catch (err) {
          throw new Error((err as Error).message);
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.routeToken = user.accessToken;
        token.id = user.id;
      }
      return token;
    },
    session({ token, session }) {
      if (token.id) session.id = token.id;
      if (token.routeToken) session.routeToken = token.routeToken;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};