import {
  detailsCategory,
  GetAllSubCategories,
} from "@/api/services/routemiser.service";
import HeaderCategories from "@/app/_components/HeaderCategories/HeaderCategories";
import Link from "next/link";
import React from "react";
import { FaFolderOpen } from "react-icons/fa";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

export default async function page(props: { params: Promise<{ id: string }> }) {
  const param = await props.params;
  const id = param.id;

  const singleCategory = await detailsCategory(id);

  const getAllSubCategories = await GetAllSubCategories();

  return (
    <>
      <HeaderCategories title={singleCategory?.name ?? ""} />
      <div className="h-full w-full bg-[#FBFCFD]">
        <div className="w-[98%] mx-auto">
          <div className="py-7">
            <Link
              href="/categories"
              className="flex items-center gap-2 hover:text-green-700 transition-colors text-lg w-fit"
            >
              <FaArrowLeftLong />
              Back to Categories
            </Link>
            <div className="font-bold text-2xl pt-3">
              {getAllSubCategories?.length} Subcategories in Books
            </div>
          </div>
          <div className="flex flex-wrap ">
            {getAllSubCategories?.map((category) => (
              <div key={category._id} className="p-2 w-1/2 md:w-1/3 lg:w-1/4">
                <div className="border  bg-white rounded-2xl p-7 h-full hover:text-green-600 cursor-pointer shadow hover:shadow-2xl transition-all ">
                  <div className="p-3 bg-[#F0FDF4] w-15 rounded-2xl flex justify-center items-center text-green-600">
                    <FaFolderOpen size={30} />
                  </div>
                  <h2 className="font-bold text-xl py-3">{category.name}</h2>
                  <div className="flex items-center gap-1">
                    <span className="text-sm">Browsr Product</span>
                    <FaArrowRightLong className="text-sm" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
