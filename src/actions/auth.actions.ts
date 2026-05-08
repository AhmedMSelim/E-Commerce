"use server";
import { LoginSchemaType, RegisterSchemaType } from "@/schemas/auth.schema";
import { cookies } from "next/headers";

export async function UserRegister(data: RegisterSchemaType) {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/auth/signup`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "content-type": "application/json" },
      },
    );

    const result = await res.json();
    return res.ok;
  } catch (err) {
    return undefined;
  }
}

export async function UserLogin(data: LoginSchemaType) {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/auth/signin`,
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "content-type": "application/json" },
    },
  );

  const result = await res.json();
  if (res.ok) {
    const cookie = await cookies();
    cookie.set("userToken", result.token, {
      httpOnly: true,
      // secure: true,
      // maxAge: 60 * 60 * 24,
    });
  }

  return res.ok;
}
