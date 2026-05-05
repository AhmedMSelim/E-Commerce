import React from "react";
import HeaderCategories from "../_components/HeaderCategories/HeaderCategories";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import { getBrands } from "@/api/services/routemiser.service";

export default async function Brands() {
  const brands = await getBrands();
  return (
    <>
      <HeaderCategories title="Top Brands" />
      <div className="w-[98%] mx-auto">
        <div className="flex flex-wrap">
          {brands?.map((brand) => (
            <Link className="p-2 w-1/2 lg:w-1/6" key={brand._id} href={`/shop`}>
              <div
                key={brand._id}
                className="border rounded-lg p-3 flex justify-center items-center cursor-pointer hover:shadow-2xl hover:transition-all shadow hover:text-[#8C4CFF]"
              >
                <div className="text-center">
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="p-8 size-40 rounded-2xl mx-auto bg-[#F9FAFB] hover:scale-110 hover:transition-all"
                  />
                  <h1 className="pt-2 font-bold">{brand.name}</h1>
                  <div className="w-ful flex justify-center items-center gap-1">
                    <span className="text-sm font-bold">View Product</span>
                    <FaArrowRightLong className="text-sm" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
