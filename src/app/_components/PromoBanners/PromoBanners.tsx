import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface PromoCardProps {
  badgeIcon: string;
  badgeText: string;
  title: string;
  description: string;
  discount: string;
  code: string;
  link: string;
  btnText: string;
  gradientClasses: string;
  btnTextColor: string;
}

const PromoCard: React.FC<PromoCardProps> = ({
  badgeIcon,
  badgeText,
  title,
  description,
  discount,
  code,
  link,
  btnText,
  gradientClasses,
  btnTextColor,
}) => (
  <div
    className={`relative overflow-hidden rounded-2xl p-8 text-white ${gradientClasses}`}
  >
    {/* Decorative Circles */}
    <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
    <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

    <div className="relative z-10">
      <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-sm mb-4">
        <span>{badgeIcon}</span>
        <span>{badgeText}</span>
      </div>

      <h3 className="text-2xl md:text-3xl font-bold mb-2">{title}</h3>
      <p className="text-white/80 mb-4">{description}</p>

      <div className="flex items-center gap-4 mb-6">
        <div className="text-3xl font-bold">{discount}</div>
        <div className="text-sm text-white/70">
          Use code: <span className="font-bold text-white">{code}</span>
        </div>
      </div>

      <Link
        href={link}
        className={`inline-flex items-center gap-2 bg-white ${btnTextColor} px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors`}
      >
        {btnText}
        <ArrowRight size={18} />
      </Link>
    </div>
  </div>
);

export default function PromoBanners() {
  return (
    <section className="py-10">
      <div className="container-[90%] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PromoCard
            badgeIcon="🔥"
            badgeText="Deal of the Day"
            title="Fresh Organic Fruits"
            description="Get up to 40% off on selected organic fruits"
            discount="40% OFF"
            code="ORGANIC40"
            link="/shop"
            btnText="Shop Now"
            gradientClasses="bg-gradient-to-br from-emerald-500 to-emerald-700"
            btnTextColor="text-emerald-600"
          />

          <PromoCard
            badgeIcon="✨"
            badgeText="New Arrivals"
            title="Exotic Vegetables"
            description="Discover our latest collection of premium vegetables"
            discount="25% OFF"
            code="FRESH25"
            link="/products?sort=newest"
            btnText="Explore Now"
            gradientClasses="bg-gradient-to-br from-orange-400 to-rose-500"
            btnTextColor="text-orange-500"
          />
        </div>
      </div>
    </section>
  );
}
