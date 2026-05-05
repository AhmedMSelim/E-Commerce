"use client";
import { addToCart } from "@/actions/cart.actions";
import { CartContext } from "@/context/CartContext";
import { Button } from "@base-ui/react";
import React, { useContext, useState } from "react";
import { toast } from "sonner";

export default function AddBtn({
  classes,
  word,
  icon,
  id,
}: {
  classes: string;
  word: string;
  icon?: React.ReactNode;
  id: string;
}) {
  const { numberOfCartItems, setnumberOfCartItems } = useContext(CartContext);
  async function AddToCart() {
    const res = await addToCart(id);
    if (res.status === "success") {
      toast.success(res.message, { position: "top-center", duration: 2000 });
      setnumberOfCartItems(numberOfCartItems + 1);
    } else {
      toast.error(res.message, { position: "top-center", duration: 2000 });
    }
  }
  return (
    <Button
      onClick={(e) => {
        e.preventDefault();
        AddToCart();
      }}
      className={classes}
    >
      {icon}
      {word}
    </Button>
  );
}
