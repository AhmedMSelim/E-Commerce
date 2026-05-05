import React from "react";
import { Truck, ShieldCheck, RotateCcw, Headset } from "lucide-react"; // Optional: Use Lucide icons for cleaner code

interface FeatureItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  bgColor: string;
  textColor: string;
}

const features: FeatureItem[] = [
  {
    title: "Free Shipping",
    description: "On orders over 500 EGP",
    icon: <Truck size={20} />,
    bgColor: "bg-blue-50",
    textColor: "text-blue-500",
  },
  {
    title: "Secure Payment",
    description: "100% secure transactions",
    icon: <ShieldCheck size={20} />,
    bgColor: "bg-emerald-50",
    textColor: "text-emerald-500",
  },
  {
    title: "Easy Returns",
    description: "14-day return policy",
    icon: <RotateCcw size={20} />,
    bgColor: "bg-orange-50",
    textColor: "text-orange-500",
  },
  {
    title: "24/7 Support",
    description: "Dedicated support team",
    icon: <Headset size={20} />,
    bgColor: "bg-purple-50",
    textColor: "text-purple-500",
  },
];

export default function Features() {
  return (
    <section className="py-8 bg-gray-50">
      <div className="container-[90%] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div
                className={`${feature.bgColor} ${feature.textColor} w-12 h-12 rounded-full flex items-center justify-center shrink-0`}
              >
                {feature.icon}
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 text-sm">
                  {feature.title}
                </h3>
                <p className="text-xs text-gray-500">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
