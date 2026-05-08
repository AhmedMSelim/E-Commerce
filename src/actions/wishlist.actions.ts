"use server";

import { wishlistData } from "@/api/types/wishlist.type";
import { getMyToken } from "@/utilities";

export async function addToWishlist(productId: string) {
  try {
    const token = await getMyToken();
    if (!token) {
      throw new Error("Please Login Frist");
    }
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
      method: "POST",
      headers: {
        token: token as string,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId: productId }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function getLoggedUserWishlist() {
  const token = await getMyToken();
  if (!token) {
    throw new Error("Please Login Frist");
  }
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
    method: "GET",
    headers: {
      token: token as string,
      // Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
}

export async function removeproductfromwishlist(productId: string) {
  const token = await getMyToken();
  if (!token) {
    throw new Error("Please Login First"); // تصحيح إملائي من Frist إلى First
  }

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, // استخدام المتغير productId بدلاً من القيمة الثابتة
    {
      method: "DELETE",
      headers: {
        token: token as string,
        "Content-Type": "application/json",
      },
    },
  );

  const data = await res.json();
  console.log("removeproductfromwishlist", data);
  return data;
}
