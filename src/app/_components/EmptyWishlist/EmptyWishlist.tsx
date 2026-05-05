import Link from "next/link";
import { Heart, ArrowRight } from "lucide-react";

export default function EmptyWishlist() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-sm mx-auto text-center">
        {/* Icon Container */}
        <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-6">
          <Heart className="text-gray-400" size={32} strokeWidth={1.5} />
        </div>

        {/* Text Content */}
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Your wishlist is empty
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          Browse products and save your favorites here.
        </p>

        {/* Action Button */}
        <div className="flex flex-col gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors group"
          >
            Browse Products
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
