import Link from "next/link";
import { ShoppingBag, Truck, Tag, Lock, ShieldCheck } from "lucide-react"; // Using Lucide for cleaner code, or keep your SVGs

export default function OrderSummary({
  itemCount = 10,
  totalAmount = 14260,
  cartId = "",
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden md:sticky md:top-20 shadow-sm">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <ShoppingBag className="w-5 h-5" />
          Order Summary
        </h2>
        <p className="text-green-100 text-sm mt-1">
          {itemCount} items in your cart
        </p>
      </div>

      <div className="p-6 space-y-5">
        {/* Free Shipping Badge */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
            <Truck className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="font-semibold text-green-700">Free Shipping!</p>
            <p className="text-sm text-green-600">
              You qualify for free delivery
            </p>
          </div>
        </div>

        {/* Pricing Details */}
        <div className="space-y-3">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span className="font-medium text-gray-900">
              {totalAmount.toLocaleString()} EGP
            </span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Shipping</span>
            <span className="font-medium text-green-600">FREE</span>
          </div>

          <div className="border-t border-dashed border-gray-200 pt-3 mt-3">
            <div className="flex justify-between items-baseline">
              <span className="text-gray-900 font-semibold">Total</span>
              <div className="text-right">
                <span className="text-2xl font-bold text-gray-900">
                  {totalAmount.toLocaleString()}
                </span>
                <span className="text-sm text-gray-500 ml-1">EGP</span>
              </div>
            </div>
          </div>
        </div>

        {/* Promo Code Button */}
        <button className="w-full flex items-center justify-center gap-2 py-3 border border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-green-400 hover:text-green-600 hover:bg-green-50/50 transition-all">
          <Tag className="w-4 h-4" />
          <span className="text-sm font-medium">Apply Promo Code</span>
        </button>

        {/* Checkout Link */}
        <Link
          href={`/checkout/${cartId}`}
          className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 px-6 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all flex items-center justify-center gap-3 shadow-lg shadow-green-600/20 active:scale-[0.98]"
        >
          <Lock className="w-5 h-5" />
          <span>Secure Checkout</span>
        </Link>

        {/* Trust Badges */}
        <div className="flex items-center justify-center gap-4 py-2">
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <ShieldCheck className="w-4 h-4 text-green-500" />
            <span>Secure Payment</span>
          </div>
          <div className="w-px h-4 bg-gray-200"></div>
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <Truck className="w-4 h-4 text-blue-500" />
            <span>Fast Delivery</span>
          </div>
        </div>

        {/* Back Link */}
        <Link
          href="/"
          className="block text-center text-green-600 hover:text-green-700 text-sm font-medium py-2"
        >
          ← Continue Shopping
        </Link>
      </div>
    </div>
  );
}
