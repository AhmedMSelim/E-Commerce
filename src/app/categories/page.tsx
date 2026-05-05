import React from "react";
import HeaderCategories from "../_components/HeaderCategories/HeaderCategories";
import { getCategories } from "@/api/services/routemiser.service";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";

export default async function Categories() {
  const allCategories = await getCategories();
  return (
    <>
      <HeaderCategories title="All Categories" />
      <div className="w-[98%] mx-auto">
        <div className="flex flex-wrap">
          {allCategories?.map((category) => (
            <Link
              className="p-2 w-1/2 lg:w-1/5"
              key={category._id}
              href={`/categories/${category._id}`}
            >
              <div key={category._id} className="">
                <div className="border rounded-lg p-4 flex justify-center items-center cursor-pointer hover:shadow-2xl hover:transition-all shadow hover:text-green-600">
                  <div className="text-center">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="size-30 rounded-2xl mx-auto hover:scale-105 hover:transition-all"
                    />
                    <h2 className="pt-2 font-bold">{category.name}</h2>
                    <div className="w-ful flex justify-center items-center gap-1">
                      <span className="text-sm font-bold">
                        View Subcategories
                      </span>
                      <FaArrowRightLong className="text-sm" />
                    </div>
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
