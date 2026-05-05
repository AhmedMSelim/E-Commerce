"use server";

export async function allOrders(userId: string) {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
    );
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
}
