import React from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { FaBoxArchive } from "react-icons/fa6";

export default function EmptyOrders() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-sm text-center">
        {/* Icon Container */}
        <div className="w-24 h-24 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-6">
          <FaBoxArchive className="w-12 h-12 text-gray-400" strokeWidth={1.5} />
        </div>

        {/* Text Content */}
        <h2 className="text-2xl font-bold text-gray-900 mb-2">No orders yet</h2>
        <p className="text-gray-500 mb-8 text-sm leading-relaxed">
          When you place orders, theyll appear here
          <br />
          so you can track them.
        </p>

        {/* Action Button */}
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3.5 px-8 rounded-xl font-semibold transition-all shadow-lg shadow-green-600/20 w-full sm:w-auto"
        >
          <ShoppingBag className="w-5 h-5" />
          Start Shopping
        </Link>
      </div>
    </div>
  );
}
