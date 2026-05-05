"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Link from "next/link";

import "swiper/swiper-bundle.css";

interface SliderButton {
  text: string;
  link: string;
  color?: string;
}

interface SlideData {
  title: string;
  desc: string;
  bg: string;
  btn1: SliderButton;
  btn2: SliderButton;
}

const slides: SlideData[] = [
  {
    title: "Fresh Products Delivered to your Door",
    desc: "Get 20% off your first order",
    bg: "assets/images/home-slider-1.d79601a8.png",
    btn1: { text: "Shop Now", link: "/products", color: "text-green-500" },
    btn2: { text: "View Deals", link: "/deals" },
  },
  {
    title: "Premium Quality Guaranteed",
    desc: "Fresh from farm to your table",
    bg: "assets/images/home-slider-1.d79601a8.png",
    btn1: { text: "Shop Now", link: "/products", color: "text-blue-500" },
    btn2: { text: "About Us", link: "/about" },
  },
];

export default function HomeSlider() {
  return (
    <div className="relative group w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        pagination={{
          clickable: true,
          el: ".custom-pagination",
          renderBullet(index, className) {
            return `<span class="${className} bg-white!"></span>`;
          },
        }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className="h-100 w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="h-full flex items-center justify-center bg-cover bg-center"
              style={{
                backgroundImage: `url(${slide.bg})`,
              }}
            >
              <div className="py-20 text-white p-4 w-full h-full bg-linear-to-r from-green-500/90 to-green-400/50">
                <div className="container mx-auto h-full flex flex-col justify-center px-4">
                  <h2 className="text-white text-3xl md:text-5xl font-bold mb-4 max-w-sm leading-tight">
                    {slide.title}
                  </h2>
                  <p className="text-lg mb-6">{slide.desc}</p>

                  <div className="flex flex-wrap gap-4">
                    <Link
                      href={slide.btn1.link}
                      className={`bg-white border-2 border-white/50 ${slide.btn1.color || "text-green-500"} px-6 py-2 rounded-lg font-semibold hover:scale-105 transition-transform`}
                    >
                      {slide.btn1.text}
                    </Link>
                    <Link
                      href={slide.btn2.link}
                      className="bg-transparent border-2 border-white/50 text-white px-6 py-2 rounded-lg font-semibold hover:scale-105 transition-transform"
                    >
                      {slide.btn2.text}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <div className="custom-pagination absolute bottom-4 left-0 right-0 z-10 flex justify-center gap-2" />
      </Swiper>

      <button className="custom-prev absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-green-500 rounded-full w-12 h-12 hidden md:flex items-center justify-center shadow-lg transition-all hover:scale-110">
        <ChevronLeftIcon />
      </button>

      <button className="custom-next absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-green-500 rounded-full w-12 h-12 hidden md:flex items-center justify-center shadow-lg transition-all hover:scale-110">
        <ChevronRightIcon />
      </button>
    </div>
  );
}

// Small helper icons to keep the main component clean
const ChevronLeftIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);
