import React from "react";
import Image from "next/image";
import { Truck, ShieldCheck, Clock } from "lucide-react";

const FreshCartHero = () => {
  return (
    <div className="">
      <div className="text-center space-y-6">
        {/* Optimized Image Component */}
        <div className="relative w-full h-96 overflow-hidden rounded-2xl shadow-lg">
          <img
            src="https://storage.googleapis.com/uxpilot-auth.appspot.com/2e5810ff3e-e750761ebcd4ae5907db.png"
            alt="fresh vegetables and fruits shopping cart illustration"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">
            FreshCart - Your One-Stop Shop for Fresh Products
          </h2>
          <p className="text-lg text-gray-600">
            Join thousands of happy customers who trust FreshCart for their
            daily grocery needs
          </p>

          {/* Features Row */}
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center">
              <Truck className="w-5 h-5 text-green-600 mr-2" />
              <span>Free Delivery</span>
            </div>

            <div className="flex items-center">
              <ShieldCheck className="w-5 h-5 text-green-600 mr-2" />
              <span>Secure Payment</span>
            </div>

            <div className="flex items-center">
              <Clock className="w-5 h-5 text-green-600 mr-2" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreshCartHero;
