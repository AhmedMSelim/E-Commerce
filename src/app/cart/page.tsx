"use client";
import React, { useContext, useEffect, useState } from "react";
import OrderSummary from "../_components/OrderSummary/OrderSummary";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import Image from "next/image";
import { Plus, Minus, Trash2 } from "lucide-react";
import {
  clearUserCart,
  getLoggedUserCart,
  removeProductFromCart,
  updateCartProductQuantity,
} from "@/actions/cart.actions";
import { toast } from "sonner";
import { PiSpinnerLight } from "react-icons/pi";
import { ImSpinner3 } from "react-icons/im";
import EmptyCart from "../_components/EmptyCart/EmptyCart";
import { Button } from "@/components/ui/button";
import { FaArrowLeftLong } from "react-icons/fa6";
import { DataCart } from "@/api/types/cart.type";
import { count } from "console";
import { CartContext } from "@/context/CartContext";

export default function Cart() {
  const [cartId, setcartId] = useState("");
  const [cartItems, setcartItems] = useState({});
  const { numberOfCartItems, setnumberOfCartItems } = useContext(CartContext);
  const [productsDetails, setproductsDetails] = useState<null | DataCart>(null);
  const [disableUpdate, setdisableUpdate] = useState(false);
  const [disableDelete, setdisableDelete] = useState(false);
  const [apdateLoaded, setapdateLoaded] = useState(false);
  const [myId, setmyId] = useState<null | string>(null);
  //
  //
  //
  async function clearCart() {
    setdisableDelete(true);
    const res = await clearUserCart();
    if (res.status === "success") {
      toast.success(res.message, { position: "top-center", duration: 2000 });
      setproductsDetails(res.data);
      setnumberOfCartItems(0);
    } else {
      toast.error(res.message, { position: "top-center", duration: 2000 });
      setdisableDelete(false);
    }
  }
  async function deleteCart(id: string, count: number) {
    setdisableDelete(true);
    const res = await removeProductFromCart(id);
    if (res.status === "success") {
      toast.success(res.message, { position: "top-center", duration: 2000 });
      setproductsDetails(res.data);
      setnumberOfCartItems(numberOfCartItems - count);
      setdisableDelete(false);
    } else {
      toast.error(res.message, { position: "top-center", duration: 2000 });
      setdisableDelete(false);
    }
  }
  async function apdateProduct(id: string, newCount: number, sign: string) {
    setmyId(id);
    setdisableUpdate(true);
    setapdateLoaded(true);
    const res = await updateCartProductQuantity(id, newCount);
    if (res.status === "success") {
      toast.success(res.message, { position: "top-center", duration: 2000 });
      setproductsDetails(res.data);
      setnumberOfCartItems(
        sign === "+" ? numberOfCartItems + 1 : numberOfCartItems - 1,
      );
      setdisableUpdate(false);
      setapdateLoaded(false);
    } else {
      toast.error(res.message, { position: "top-center", duration: 2000 });
      setdisableUpdate(false);
      setapdateLoaded(false);
    }
  }

  useEffect(() => {
    async function getUserCart() {
      const res = await getLoggedUserCart();
      if (res.status === "success") {
        setcartId(res.cartId);
        setproductsDetails(res.data);
      }
    }
    getUserCart();
  }, []);
  //

  if (!productsDetails) {
    return (
      <div className="mx-auto flex items-center justify-center h-screen">
        <ImSpinner3 className="animate-spin size-10 text-green-500" />
      </div>
    );
  }
  return (
    <>
      {productsDetails?.products.length > 0 ? (
        <>
          <header className="bg-[#F9FAFB] from-green-600 via-green-500 to-green-400 text-white">
            <div className="container-[90%] mx-auto px-4 py-12 sm:py-16">
              <nav className="flex items-center gap-2 text-sm text-black mb-6">
                <Link href="/" className="hover:green-500 transition-colors">
                  Home
                </Link>
                <span className="text-black">/</span>
                <div className="hover:text-green-500 transition-colors">
                  Shopping Cart
                </div>
              </nav>

              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl bg-green-600 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30">
                  <FaShoppingCart className="text-white size-10" />
                </div>

                <div>
                  <h1 className="text-black text-3xl sm:text-4xl font-bold tracking-tight">
                    Shopping Cart
                  </h1>
                  <p className="text-gray-500 mt-1">
                    You have
                    <span className="text-green-500">
                      {productsDetails?.products.length} item
                    </span>
                    in your cart
                  </p>
                </div>
              </div>
            </div>
          </header>
          <div className="bg-[#F9FAFB]">
            <section className="w-[95%] md:w-[97%] mx-auto my-12 flex justify-between flex-wrap">
              <div className="w-full md:w-3/5">
                {productsDetails?.products.map((product) => (
                  <div
                    key={product.product.id}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-5 mb-5"
                  >
                    <div className="flex gap-4 sm:gap-6">
                      {/* Product Image */}
                      <Link
                        href={`/productdetails/${product.product.id}`}
                        className="relative shrink-0 group"
                      >
                        <div className="flex items-center w-28 h-28 sm:w-32 sm:h-32 rounded-xl bg-gray-50 p-3 border border-gray-100 overflow-hidden relative">
                          <img
                            src={product.product.imageCover}
                            alt={product.product.title}
                            className="object-contain transition-transform duration-300 group-hover:scale-110 p-3"
                          />
                        </div>
                      </Link>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0 flex flex-col">
                        <div className="mb-3">
                          <Link
                            href={`//productdetails/${product.product.id}`}
                            className="group/title"
                          >
                            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors leading-relaxed text-base sm:text-lg">
                              {product.product.title}
                            </h3>
                          </Link>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="inline-block px-2.5 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full">
                              {product.product.category.name}
                            </span>
                          </div>
                        </div>

                        <div className="mb-4">
                          <span className="text-green-600 font-bold text-lg">
                            {product.price}
                            EGP
                          </span>
                        </div>

                        {/* Actions Row */}
                        <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
                          {/* Quantity Controls */}
                          <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-200">
                            <button
                              disabled={
                                product.count === 1 ||
                                (product.product.id === myId && disableUpdate)
                              }
                              onClick={() =>
                                apdateProduct(
                                  product.product.id,
                                  product.count - 1,
                                  "-",
                                )
                              }
                              className="cursor-pointer disabled:cursor-not-allowed disabled:bg-slate-300 h-8 w-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-500 hover:text-gray-700 disabled:opacity-40 transition-all"
                            >
                              <Minus size={14} />
                            </button>
                            {apdateLoaded && product.product.id === myId ? (
                              <span className="w-12 flex justify-center">
                                <PiSpinnerLight className="animate-spin" />
                              </span>
                            ) : (
                              <span className="w-12 text-center font-bold text-gray-900">
                                {product.count}
                              </span>
                            )}

                            <button
                              disabled={
                                product.product.id === myId
                                  ? disableUpdate
                                  : false
                              }
                              onClick={() =>
                                apdateProduct(
                                  product.product.id,
                                  product.count + 1,
                                  "+",
                                )
                              }
                              className="cursor-pointer disabled:cursor-not-allowed disabled:bg-green-400 h-8 w-8 rounded-lg bg-green-600 shadow-sm flex items-center justify-center text-white hover:bg-green-700 transition-all"
                            >
                              <Plus size={14} />
                            </button>
                          </div>

                          {/* Total and Delete */}
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="text-xs text-gray-400 mb-0.5">
                                Total
                              </p>
                              <p className="text-xl font-bold text-gray-900">
                                {/* {price * quantity} */}
                                <span className="text-sm font-medium text-gray-400">
                                  <span className="text-black font-bold text-lg pe-1">
                                    {product.count * product.price}
                                  </span>
                                  EGP
                                </span>
                              </p>
                            </div>

                            <button
                              disabled={
                                product.product.id === myId
                                  ? disableDelete
                                  : false
                              }
                              onClick={() =>
                                deleteCart(product.product.id, product.count)
                              }
                              className="disabled:bg-red-300 disabled:cursor-not-allowed cursor-pointer h-10 w-10 rounded-xl border border-red-200 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 flex items-center justify-center transition-all duration-200"
                              title="Remove item"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <hr className="my-5" />
                <div className="flex justify-between items-center pb-3">
                  <Link
                    href="/"
                    className="flex items-center gap-2 text-gray-500 hover:text-green-500"
                  >
                    <FaArrowLeftLong />
                    Continue Shopping
                  </Link>
                  <Button
                    onClick={() => clearCart()}
                    className="cursor-pointer bg-transparent flex items-center gap-2 text-gray-500 hover:text-red-500"
                  >
                    <Trash2 size={18} />
                    Clear all items
                  </Button>
                </div>
              </div>
              <div className="w-full md:w-2/5 md:ps-10">
                <OrderSummary
                  cartId={cartId}
                  itemCount={productsDetails?.products.length}
                  totalAmount={productsDetails?.totalCartPrice}
                />
              </div>
            </section>
          </div>
        </>
      ) : (
        <EmptyCart />
      )}
    </>
  );
}
