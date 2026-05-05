import React from "react";
import { allProducts } from "@/api/services/routemiser.service";
import ProductCard from "../ProductCard/ProductCard";


//https://ecommerce.routemisr.com/api/v1/products

export default async function FeaturdProduct() {
  const products = await allProducts();
  return (
    <>
      <div className="relative w-[98%] mx-auto">
        <h1 className="before:content-[''] before:absolute before:top-0 before:left-0 before:h-full before:w-2 before:bg-[#16A34A] text-4xl font-bold ps-5 before:rounded-4xl">
          Featured <span className="text-[#16A34A]">Products</span>
        </h1>
      </div>
      <div className="w-[98%] mx-auto my-8 flex flex-wrap">
        {products?.map((product) => (
          <div key={product.id} className="p-2 w-full md:w-1/2 lg:w-1/5">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </>
  );
}
