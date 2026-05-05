"use client";

import { getLoggedUserWishlist } from "@/actions/wishlist.actions";
import { createContext, useEffect, useState } from "react";

export const WishlistContext = createContext({
  numberOfWishlistItems: 0,
  setnumberOfWishlistItems(num: number) {},
});

export default function WishlistContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [numberOfWishlistItems, setnumberOfWishlistItems] = useState(0);

  useEffect(() => {
    async function getUserWishlist() {
      try {
        const res = await getLoggedUserWishlist();
        const num = res.data.length;
        setnumberOfWishlistItems(num);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.log(err.message);
        }
      }
    }
    getUserWishlist();
  }, []);
  return (
    <WishlistContext.Provider
      value={{ numberOfWishlistItems, setnumberOfWishlistItems }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
