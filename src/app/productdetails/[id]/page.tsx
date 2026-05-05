import { getLoggedUserWishlist } from "@/actions/wishlist.actions";
import { getProductDetails } from "@/api/services/routemiser.service";
import AddBtn from "@/app/_components/AddBtn/AddBtn";
import AddWishlist from "@/app/_components/AddWishlist/AddWishlist";
import FeaturesSection from "@/app/_components/FeaturesSection/FeaturesSection";
import { Button } from "@base-ui/react";
import { Star } from "lucide-react";
import React from "react";
import { CiHeart, CiStar } from "react-icons/ci";
import { FaShareAlt, FaShareAltSquare, FaShoppingCart } from "react-icons/fa";
import { GiPowerLightning } from "react-icons/gi";

export default async function Productdetails(props: {
  params: Promise<{ id: string }>;
}) {
  const param = await props.params;
  const id = param.id;

  const product = await getProductDetails(id);

  return (
    <>
      <div className="w-[95%] mx-auto my-4 flex flex-wrap py-5 justify-between">
        <div className="p-5 w-4/4 md:w-1/4 ">
          <div className="p-4 shadow rounded-2xl border">
            <img
              src={product?.imageCover}
              alt={product?.title}
              className="w-full"
            />
            <div className="flex flex-wrap w-[93%] mx-auto">
              {product?.images.map((src) => (
                <div
                  className="w-1/3 my-1 hover:border-2 hover:border-blue-500"
                  key={src}
                >
                  <img src={src} alt={src} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="p-5 w-4/4 md:w-3/4 ">
          <div className="p-6 shadow rounded-2xl border">
            <h2 className="text-4xl font-bold mb-5">{product?.title}</h2>
            <h3 className="mb-5 text-gray-500">{product?.description}</h3>
            <div className="rate flex items-center gap-1 mb-5">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={18}
                    className={`${
                      star <= Math.round(product?.ratingsAverage ?? 0)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              {product?.ratingsAverage}
              {` (${product?.ratingsQuantity} reviews)`}
            </div>
            <div className="mb-5">
              {product?.priceAfterDiscount ? (
                <div className="flex gap-3 items-center">
                  <span className="text-green-600 font-bold text-3xl">
                    {product?.priceAfterDiscount}
                    <span className="ps-1">EGP</span>
                  </span>
                  <span className="text-2xl text-slate-600 line-through">
                    {product?.price}EGP
                  </span>
                  <div className="h-7 w-25 bg-red-600 rounded-3xl text-white flex justify-center items-center">
                    {`Save ${Math.round((product?.priceAfterDiscount * 100) / product?.price) - 100}%`}
                  </div>
                </div>
              ) : (
                <div className="text-black font-bold text-3xl">
                  {product?.price}
                  <span className="ps-1">EGP</span>
                </div>
              )}
            </div>
            <div className="mb-5 p-4 rounded-2xl bg-[#F9FAFB] flex justify-between items-center">
              <span className="font-bold text-2xl">Total Price:</span>
              <span>
                {product?.priceAfterDiscount ? (
                  <div className="flex gap-3 items-center">
                    <span className="text-black font-bold text-3xl">
                      {product?.priceAfterDiscount}
                      <span className="ps-1">EGP</span>
                    </span>
                  </div>
                ) : (
                  <div className="text-black font-bold text-3xl">
                    {product?.price}
                    <span className="ps-1">EGP</span>
                  </div>
                )}
              </span>
            </div>
            <div className="flex flex-wrap justify-between items-center">
              <div className="md:pe-2 w-1/1 md:w-1/2">
                <AddBtn
                  classes="flex items-center justify-center gap-2 w-full rounded-lg p-4 my-4 font-bold text-lg bg-[#16A34A]  cursor-pointer text-white hover:bg-green-700 transition-colors"
                  icon={<FaShoppingCart />}
                  word="Add To Cart"
                  id={id}
                />
              </div>
              <div className="md:ps-2 w-1/1 md:w-1/2">
                <Button className="flex items-center justify-center gap-2 w-full rounded-lg p-4 my-4 font-bold text-lg bg-black  cursor-pointer text-white">
                  <GiPowerLightning />
                  Buy Now
                </Button>
              </div>
            </div>
            <div className="flex justify-between items-center w-full">
              <div className="pe-2 w-[95%]">
                <AddWishlist
                  icon="size-5"
                  id={id}
                  classes="border-2 h-12 flex justify-center gap-2 w-full bg-transbarant text-black border-gray-200 items-center rounded-lg cursor-pointer hover:text-green-400 hover:border-green-400 transition-colors"
                  word="Add to Wishlist"
                />
              </div>
              <div className="w-[50px]">
                <div className="h-12 border-2 rounded-lg flex justify-center items-center cursor-pointer hover:text-green-400 hover:border-green-400 transition-colors">
                  <FaShareAlt />
                </div>
              </div>
            </div>
            <FeaturesSection />
          </div>
        </div>
      </div>
    </>
  );
}
