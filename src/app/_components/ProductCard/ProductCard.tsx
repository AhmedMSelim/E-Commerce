import { productType } from "@/api/types/routemiser.type";
import React from "react";
import { CiHeart, CiStar } from "react-icons/ci";
import { FaArrowsRotate } from "react-icons/fa6";
import { IoIosEye } from "react-icons/io";
import AddBtn from "../AddBtn/AddBtn";
import { Star } from "lucide-react";
import Link from "next/link";
import { Button } from "@base-ui/react";
import AddWishlist from "../AddWishlist/AddWishlist";
import { getLoggedUserWishlist } from "@/actions/wishlist.actions";

export default async function ProductCard({
  product,
}: {
  product: productType;
}) {
  return (
    <div className="relative">
      <div className="border h-full rounded-lg p-4 hover:shadow-lg transition-shadow duration-300 hover:-translate-y-1.5 hover:transition-transform">
        <div className="absolute h-10 w-5 top-5 right-7">
          <AddWishlist
            id={product.id}
            icon="size-5 font-bold text-black group-hover:text-red-600 hover:transition-colors"
            classes="group h-7 w-7 rounded-full bg-white shadow flex justify-center items-center mb-2 cursor-pointer"
          />
          <div className="h-7 w-7 rounded-full bg-white shadow flex justify-center items-center mb-2 cursor-pointer">
            <FaArrowsRotate className="size-5 font-bold hover:text-green-600 hover:transition-colors" />
          </div>
          <Link
            href={`/productdetails/${product.id}`}
            className="h-7 w-7 rounded-full bg-white shadow flex justify-center items-center mb-2 cursor-pointer "
          >
            <IoIosEye className="size-5 font-bold hover:text-green-600 hover:transition-colors" />
          </Link>
        </div>

        <img src={product.imageCover} alt={product.title} />
        <Link href={`/productdetails/${product.id}`}>
          <h2 className="line-clamp-1 text-gray-400 text-[14px]">
            {product.title}
          </h2>
          <h3 className="line-clamp-1">{product.description}</h3>
        </Link>

        <div className="rate flex items-center gap-1">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={18}
                className={`${
                  star <= Math.round(product.ratingsAverage)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          {product.ratingsAverage}
          {`(${product.ratingsQuantity})`}
        </div>

        <div className="price flex justify-between items-center">
          {product.priceAfterDiscount ? (
            <div className="flex gap-3 items-center">
              <div className="absolute top-7 left-7 h-7 w-12 bg-red-600 rounded text-white flex justify-center items-center">
                {`${Math.ceil((product.priceAfterDiscount * 100) / product.price) - 100}%`}
              </div>
              <div className="flex flex-wrap items-center">
                <span className="text-green-600 font-bold text-xl">
                  {product.priceAfterDiscount}
                  <span className="ps-1">EGP</span>
                </span>
                <span className="text-sm text-slate-600 line-through">
                  {product.price}EGP
                </span>
              </div>
            </div>
          ) : (
            <div className="text-black font-bold text-xl">
              {product.price}
              <span className="ps-1">EGP</span>
            </div>
          )}
          <AddBtn
            classes="size-10 rounded-full bg-[#16A34A] text-2xl cursor-pointer text-white font-bold"
            word="+"
            id={product.id}
          />
        </div>
      </div>
    </div>
  );
}
