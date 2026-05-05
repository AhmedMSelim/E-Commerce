import React from "react";
import Link from "next/link";
import { Home } from "lucide-react";

export default function notFound() {
  return (
    <>
      <div className="flex justify-center items-center h-screen bg-[#F7FAF9] w-full">
        <div className="text-center md:w-[45%] w-[90%]">
          <div className="mb-2 flex justify-center items-center font-bold text-5xl h-25 w-25 rounded-full text-center mx-auto bg-[#1AAD50]">
            <div className="text-white">404</div>
          </div>
          <div className="mb-2 font-bold text-4xl md:text-6xl">
            Oops! Nothing Here
          </div>
          <p className="mb-2 text-1xl md:text-2xl text-[#757C8B]">
            Looks like this page went out of stock! Dont worry, theres plenty
            more fresh content to explore.
          </p>
          <Link
            href="/"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg shadow-emerald-600/25 hover:shadow-xl hover:shadow-emerald-600/30 hover:-translate-y-1"
          >
            <Home
              size={24}
              className="group-hover:scale-110 transition-transform duration-300"
            />
            Go to Homepage
          </Link>
        </div>
      </div>
    </>
  );
}
