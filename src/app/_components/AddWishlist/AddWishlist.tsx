"use client";
import { addToWishlist } from "@/actions/wishlist.actions";
import { Button } from "@/components/ui/button";
import { WishlistContext } from "@/context/WishlistContext";
import React, { useContext } from "react";
import { CiHeart } from "react-icons/ci";
import { toast } from "sonner";

export default function AddWishlist({
  classes,
  word,
  icon,
  id,
}: {
  classes: string;
  word?: string;
  icon: string;
  id: string;
}) {
  const { numberOfWishlistItems, setnumberOfWishlistItems } =
    useContext(WishlistContext);
  async function AddToWishlist() {
    const res = await addToWishlist(id);
    if (res.status === "success") {
      toast.success(res.message, { position: "top-center", duration: 2000 });
      setnumberOfWishlistItems(numberOfWishlistItems + 1);
    } else {
      toast.error(res.message, { position: "top-center", duration: 2000 });
    }
  }
  return (
    <Button
      onClick={(e) => {
        e.preventDefault();
        AddToWishlist();
      }}
      className={classes}
    >
      <CiHeart className={icon} />
      {word}
    </Button>
  );
}
