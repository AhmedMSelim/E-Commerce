import React from "react";
import HeaderCategories from "../_components/HeaderCategories/HeaderCategories";
import { allProducts } from "@/api/services/routemiser.service";
import ProductCard from "../_components/ProductCard/ProductCard";

export default async function Shop() {
  const products = await allProducts();
  return (
    <>
      <HeaderCategories title="All Product" />
      <div className="relative w-[98%] mx-auto">
        <h6 className="pt-7 text-lg text-gray-500">
          Showing {products?.length} products
        </h6>
      </div>
      <div className="w-[98%] mx-auto my-4 flex flex-wrap">
        {products?.map((product) => (
          <div className="p-2 w-full md:w-1/2 lg:w-1/5" key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </>
  );
}
