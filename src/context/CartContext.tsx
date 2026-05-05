"use client";
import { getLoggedUserCart } from "@/actions/cart.actions";
import { product } from "@/api/types/cart.type";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({
  numberOfCartItems: 0,
  setnumberOfCartItems(num: number) {},
});

export default function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [numberOfCartItems, setnumberOfCartItems] = useState(0);

  useEffect(() => {
    async function getUserCart() {
      try {
        const res = await getLoggedUserCart();
        let sum = 0;
        res.data.products.forEach((product: product) => {
          sum += product.count;
        });
        setnumberOfCartItems(sum);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.log(err.message);
        }
      }
    }
    getUserCart();
  }, []);

  return (
    <CartContext.Provider value={{ numberOfCartItems, setnumberOfCartItems }}>
      {children}
    </CartContext.Provider>
  );
}
