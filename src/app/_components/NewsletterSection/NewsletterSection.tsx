"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Apple, Play, Leaf, Truck, Tag, Mail, ArrowRight } from "lucide-react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Subscribing:", email);
    // Add your newsletter logic here
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="relative">
          {/* Main Container Card */}
          <div className="bg-gradient-to-br from-emerald-50 via-white to-teal-50 rounded-[2.5rem] border border-emerald-100/50 shadow-2xl shadow-emerald-500/10 overflow-hidden">
            {/* Background Decorative Blobs */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-emerald-200/40 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-teal-200/30 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

            <div className="relative grid lg:grid-cols-5 gap-8 p-8 lg:p-14">
              {/* Left Side: Newsletter (3/5 Columns) */}
              <div className="lg:col-span-3 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/30 text-white">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-emerald-600 uppercase tracking-wide">
                      Newsletter
                    </h3>
                    <p className="text-xs text-gray-500">50,000+ subscribers</p>
                  </div>
                </div>

                <div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-snug">
                    Get the Freshest Updates{" "}
                    <span className="text-emerald-600 block md:inline">
                      Delivered Free
                    </span>
                  </h2>
                  <p className="text-gray-500 mt-3 text-lg">
                    Weekly recipes, seasonal offers & exclusive member perks.
                  </p>
                </div>

                {/* Benefits Badges */}
                <div className="flex flex-wrap gap-3">
                  <BenefitBadge
                    icon={<Leaf size={14} />}
                    text="Fresh Picks Weekly"
                  />
                  <BenefitBadge
                    icon={<Truck size={14} />}
                    text="Free Delivery Codes"
                  />
                  <BenefitBadge
                    icon={<Tag size={14} />}
                    text="Members-Only Deals"
                  />
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="pt-2">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full pl-5 pr-5 py-4 bg-white border-2 border-gray-200 rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all shadow-sm"
                      />
                    </div>
                    <button
                      type="submit"
                      className="group flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-semibold text-white bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-500/30 hover:scale-[1.02] transition-all duration-300"
                    >
                      Subscribe
                      <ArrowRight
                        size={18}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mt-3 pl-1">
                    ✨ Unsubscribe anytime. No spam, ever.
                  </p>
                </form>
              </div>

              {/* Right Side: App Promo (2/5 Columns) */}
              <div className="lg:col-span-2 lg:border-l lg:border-emerald-100 lg:pl-8">
                <div className="h-full flex flex-col justify-center">
                  <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 text-white relative overflow-hidden">
                    {/* Interior Blobs */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-teal-500/20 rounded-full blur-2xl" />

                    <div className="relative space-y-5">
                      <div className="inline-block bg-emerald-500/20 text-emerald-400 text-xs font-semibold px-3 py-1.5 rounded-full border border-emerald-500/30 tracking-wider">
                        📱 MOBILE APP
                      </div>
                      <h3 className="text-2xl font-bold leading-tight">
                        Shop Faster on Our App
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        Get app-exclusive deals & 15% off your first order.
                      </p>

                      <div className="flex flex-col gap-3 pt-2">
                        <StoreLink
                          icon={<Apple size={20} />}
                          store="App Store"
                          label="Download on"
                        />
                        <StoreLink
                          icon={<Play size={20} />}
                          store="Google Play"
                          label="Get it on"
                        />
                      </div>

                      <div className="flex items-center gap-2 pt-2 text-sm">
                        <span className="text-yellow-400 text-lg">★★★★★</span>
                        <span className="text-gray-400">
                          4.9 • 100K+ downloads
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Sub-components for better organization
function BenefitBadge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2.5 bg-white/80 backdrop-blur-sm border border-emerald-100 px-4 py-2.5 rounded-full shadow-sm">
      <div className="w-7 h-7 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
        {icon}
      </div>
      <span className="text-sm font-medium text-gray-700">{text}</span>
    </div>
  );
}

function StoreLink({
  icon,
  store,
  label,
}: {
  icon: React.ReactNode;
  store: string;
  label: string;
}) {
  return (
    <Link
      href="#"
      className="flex items-center gap-3 bg-white/10 hover:bg-white/15 backdrop-blur-sm border border-white/10 px-4 py-3 rounded-xl transition-all hover:scale-[1.02]"
    >
      <div className="text-white">{icon}</div>
      <div className="text-left">
        <div className="text-[10px] text-gray-400 uppercase tracking-wide leading-none">
          {label}
        </div>
        <div className="text-sm font-semibold">{store}</div>
      </div>
    </Link>
  );
}
