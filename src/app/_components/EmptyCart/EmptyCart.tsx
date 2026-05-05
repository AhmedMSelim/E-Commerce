import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FaBoxOpen } from "react-icons/fa";

export default function EmptyCart() {
  return (
    <div className="min-h-[60vh] pt-10 flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        {/* Animated Icon Container */}
        <div className="relative mb-8">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center mx-auto shadow-inner">
            <FaBoxOpen className="text-5xl text-gray-300 w-16 h-16" />
          </div>
          {/* Shadow effect */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-4 bg-gray-100 rounded-full blur-md"></div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Your cart is empty
        </h2>

        <p className="text-gray-500 mb-8 leading-relaxed">
          Looks like you havent added anything to your cart yet.
          <br />
          Start exploring our products!
        </p>

        {/* Start Shopping Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white py-3.5 px-8 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all shadow-lg shadow-green-600/20 active:scale-[0.98]"
        >
          Start Shopping
          <ArrowRight size={18} />
        </Link>

        {/* Popular Categories Section */}
        <div className="mt-12 pt-8 border-t border-gray-100">
          <p className="text-sm text-gray-400 mb-4">Popular Categories</p>
          <div className="flex flex-wrap justify-center gap-2">
            {["Electronics", "Fashion", "Home", "Beauty"].map((cat) => (
              <Link
                key={cat}
                href={cat === "Home" ? "/" : "/categories"}
                className="px-4 py-2 bg-gray-50 hover:bg-green-50 hover:text-green-600 text-gray-600 rounded-full text-sm font-medium transition-colors"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
