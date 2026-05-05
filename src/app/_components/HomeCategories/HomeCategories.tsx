import React from "react";
import { getCategories } from "@/api/services/routemiser.service";
import { FaArrowRightLong } from "react-icons/fa6";
import Link from "next/link";

export default async function HomeCategories() {
  const Categories = await getCategories();

  return (
    <>
      <div className="relative w-[98%] mx-auto my-8 flex flex-wrap justify-between items-center">
        <h1 className="before:content-[''] before:absolute before:top-0 before:left-0 before:h-full before:w-2 before:bg-[#16A34A] text-4xl font-bold ps-5 before:rounded-4xl">
          Shop By <span className="text-[#16A34A]">Category</span>
        </h1>
        <Link
          href="/categories"
          className="flex items-center ps-5 md:ps-0 gap-2 text-[#16A34A] hover:text-green-700 transition-colors text-xl"
        >
          View All Categories
          <FaArrowRightLong />
        </Link>
      </div>
      <div className="w-[98%] mx-auto">
        <div className="flex flex-wrap">
          {Categories?.map((category) => (
            <Link
              className="p-2 w-1/2 lg:w-1/6"
              key={category._id}
              href={`/categories/${category._id}`}
            >
              <div key={category._id} className="">
                <div className="border rounded-lg p-4 flex justify-center items-center cursor-pointer hover:shadow-gray-400 transition-shadow shadow">
                  <div className="text-center">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="size-20 rounded-full mx-auto"
                    />
                    <h2 className="pt-1">{category.name}</h2>
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
