"use client";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { IoHeart } from "react-icons/io5";
import { ShoppingCart, Trash2 } from "lucide-react";
import {
  getLoggedUserWishlist,
  removeproductfromwishlist,
} from "@/actions/wishlist.actions";
import { ImSpinner3 } from "react-icons/im";
import AddBtn from "../_components/AddBtn/AddBtn";
import { toast } from "sonner";
import { FaArrowLeftLong } from "react-icons/fa6";
import { wishlistData } from "@/api/types/wishlist.type";
import EmptyWishlist from "../_components/EmptyWishlist/EmptyWishlist";
import { WishlistContext } from "@/context/WishlistContext";

export default function Wishlist() {
  const { numberOfWishlistItems, setnumberOfWishlistItems } =
    useContext(WishlistContext);
  const [wishlistDetails, setwishlistDetails] = useState<null | wishlistData[]>(
    null,
  );

  async function deleteWishlist(id: string) {
    const res = await removeproductfromwishlist(id);
    const updated = await getLoggedUserWishlist();
    if (res.status === "success") {
      toast.success(res.message, { position: "top-center", duration: 2000 });
      setwishlistDetails(updated.data);
      setnumberOfWishlistItems(numberOfWishlistItems - 1);
    } else {
      toast.error(res.message, { position: "top-center", duration: 2000 });
    }
  }

  useEffect(() => {
    async function getUserWishlist() {
      const res = await getLoggedUserWishlist();
      if (res.status === "success") {
        setwishlistDetails(res.data);
      }
    }
    getUserWishlist();
  }, []);

  if (!wishlistDetails) {
    return (
      <div className="mx-auto flex items-center justify-center h-screen">
        <ImSpinner3 className="animate-spin size-10 text-green-500" />
      </div>
    );
  }
  return (
    <>
      {wishlistDetails?.length > 0 ? (
        <>
          <header className="bg-white from-green-600 via-green-500 to-green-400 text-white">
            <div className="container-[90%] mx-auto px-4 py-12 sm:py-16">
              <nav className="flex items-center gap-2 text-sm text-black mb-6">
                <Link href="/" className="hover:green-500 transition-colors">
                  Home
                </Link>
                <span className="text-black">/</span>
                <div className="hover:text-green-500 transition-colors">
                  Wishlist
                </div>
              </nav>

              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl bg-[#FEF2F2] backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30">
                  <IoHeart className="text-red-400 size-10" />
                </div>

                <div>
                  <h1 className="text-black text-3xl sm:text-4xl font-bold tracking-tight">
                    My Wishlist
                  </h1>
                  <p className="text-gray-500 mt-1">
                    {wishlistDetails?.length} item saved
                  </p>
                </div>
              </div>
            </div>
          </header>
          <div className="bg-[#F9FAFB]">
            <section className="w-[95%] md:w-[97%] mx-auto mt-12 mb-4 rounded-xl shadow overflow-hidden">
              <div className="w-full hidden md:flex  items-center p-4">
                <div className="w-[42%]">
                  <h2 className="text-black">Product</h2>
                </div>
                <div className="w-[20%]">
                  <h2 className="text-black">Price</h2>
                </div>
                <div className="w-[25%]">
                  <h2 className="text-black">Status</h2>
                </div>
                <div className="flex ">
                  <h2 className="text-black">Actions</h2>
                </div>
              </div>
              {wishlistDetails?.map((product) => (
                <React.Fragment key={product.id ?? product.id}>
                  <div className="w-full flex justify-between items-center flex-wrap bg-white py-3 gap-4 p-4 md:px-6 md:py-5 hover:bg-gray-50/50 transition-colors">
                    <div className="w-full md:w-[30%] flex items-center gap-4">
                      <Link
                        href={`/productdetails/${product.id}`}
                        className="w-20 h-20 flex items-center justify-center rounded-xl bg-gray-50 border border-gray-100 overflow-hidden shrink-0 relative"
                      >
                        <img
                          src={product.imageCover}
                          alt={product.title}
                          className="object-contain p-3"
                        />
                      </Link>
                      <div className="min-w-0">
                        <Link
                          href={`/productdetails/${product.id}`}
                          className="font-medium text-gray-900 hover:text-green-600 transition-colors line-clamp-2"
                        >
                          {product.title}
                        </Link>
                        <p className="text-sm text-gray-400 mt-1">
                          {product.category?.name || "Fashion"}
                        </p>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="w-full md:w-[15%] flex md:justify-center items-center gap-2">
                      <span className="md:hidden text-sm text-gray-500">
                        Price:
                      </span>
                      <div className="text-right md:text-center">
                        <div className="font-semibold text-gray-900">
                          {product.price} EGP
                        </div>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="w-full md:w-[15%] flex md:justify-center">
                      <span className="md:hidden text-sm text-gray-500 mr-2">
                        Status:
                      </span>
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                          product.id
                            ? "bg-green-50 text-green-700"
                            : "bg-red-50 text-red-700"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${product.id ? "bg-green-500" : "bg-red-500"}`}
                        ></span>
                        {product.id ? "In Stock" : "Out of Stock"}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="w-full md:w-[20%] flex items-center gap-2 md:justify-center">
                      <AddBtn
                        id={product.id}
                        word="Add to Cart"
                        icon={<ShoppingCart size={16} />}
                        classes="cursor-pointer flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all bg-green-600 text-white hover:bg-green-700"
                      />
                      <button
                        onClick={() => deleteWishlist(product.id)}
                        className="cursor-pointer w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all"
                        title="Remove"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  <hr />
                </React.Fragment>
              ))}
            </section>
            <Link
              href="/"
              className="flex items-center ps-3 md:ps-8 py-5 gap-2 text-gray-500 hover:text-green-500"
            >
              <FaArrowLeftLong />
              Continue Shopping
            </Link>
          </div>
        </>
      ) : (
        <EmptyWishlist />
      )}
    </>
  );
}
