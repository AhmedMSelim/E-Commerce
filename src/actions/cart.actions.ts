"use server";
import { getMyToken } from "@/utilities";

export async function addToCart(productId: string) {
  try {
    const token = await getMyToken();
    if (!token) {
      throw new Error("Please Login Frist");
    }
    const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`, {
      method: "POST",
      headers: {
        token: token as string,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId: productId }),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    return err;
  }
}

export async function getLoggedUserCart() {
  const token = await getMyToken();
  if (!token) {
    throw new Error("Please Login Frist");
  }
  const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`, {
    method: "GET",
    headers: {
      token: token as string,
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
}
export async function updateCartProductQuantity(
  productId: string,
  count: number,
) {
  const token = await getMyToken();
  if (!token) {
    throw new Error("Please Login Frist");
  }
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v2/cart/${productId}`,
    {
      method: "PUT",
      headers: {
        token: token as string,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ count: count }),
    },
  );
  const data = await res.json();
  return data;
}
export async function removeProductFromCart(productId: string) {
  const token = await getMyToken();
  if (!token) {
    throw new Error("Please Login Frist");
  }
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v2/cart/${productId}`,
    {
      method: "DELETE",
      headers: {
        token: token as string,
        "Content-Type": "application/json",
      },
    },
  );
  const data = await res.json();
  console.log("removeProductFromCart", data);
  return data;
}
export async function clearUserCart() {
  const token = await getMyToken();
  if (!token) {
    throw new Error("Please Login Frist");
  }
  const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`, {
    method: "DELETE",
    headers: {
      token: token as string,
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
}
