// Configuration of Nextauth
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

declare module "next-auth" {
  interface User {
    accessToken?: string;
    id?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    routeToken?: string;
    id?: string;
  }
}
export const authOptions: NextAuthOptions = {
  providers: [
    // Way to Login With Email & Passwod
    Credentials({
      // Button Name
      name: "myLogin",

      // Input
      credentials: {
        email: {
          Label: "email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: {
          Label: "password",
          type: "password",
          placeholder: "***********",
        },
      },

      // function to call api ==> when click on button
      async authorize(credentials, req) {
        // excute when call api
        //get form values
        // on success ==> return object user data
        // on erorr ==> null / false / erorr

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
            },
          );

          const result = await res.json();
          if (!res.ok) {
            throw new Error(result.message || "Invalid Login");
          }

          const jwt: { id: string } = jwtDecode(result.token);

          return {
            id: jwt.id,
            name: result.user.name,
            email: result.user.email,
            accessToken: result.token,
          };
        } catch (err) {
          console.log("erorr from api", err);
          throw new Error((err as Error).message || "Invalid Login");
        }
      },
    }),
  ],
  // callbacks ===> will be excute after successfully login | user - refresh
  callbacks: {
    jwt(param) {
      // console.log("jwt ppppppppppppp", param);
      if (param.user) {
        param.token.routeToken = param.user.accessToken;
        param.token.id = param.user.id;
      }
      return param.token;
    },

    //
    //
    session({ token, session }) {
      if (token.id) {
        session.id = token.id;
      }
      // param.session.token = param.token.routeToken;

      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};
