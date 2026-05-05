import React from "react";
import { Truck, RotateCcw, ShieldCheck, Headset } from "lucide-react";

const services = [
  {
    title: "Free Shipping",
    desc: "On orders over 500 EGP",
    icon: <Truck size={20} />,
  },
  {
    title: "Easy Returns",
    desc: "14-day return policy",
    icon: <RotateCcw size={20} />,
  },
  {
    title: "Secure Payment",
    desc: "100% secure checkout",
    icon: <ShieldCheck size={20} />,
  },
  {
    title: "24/7 Support",
    desc: "Contact us anytime",
    icon: <Headset size={20} />,
  },
];

export default function ServiceBar() {
  return (
    <div className="bg-emerald-50 border-y border-emerald-100">
      <div className="container-[90%] mx-auto px-4 py-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0 text-emerald-600">
                {service.icon}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">
                  {service.title}
                </h4>
                <p className="text-gray-500 text-xs">{service.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
