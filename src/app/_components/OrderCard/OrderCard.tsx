"use client";
import React, { useEffect, useState } from "react";
import {
  Clock,
  CalendarDays,
  Box,
  ChevronDown,
  Receipt,
  Phone,
} from "lucide-react";
import { FaBoxArchive, FaLocationDot } from "react-icons/fa6";
import { CiHashtag, CiMoneyBill } from "react-icons/ci";
import { allOrders } from "@/actions/orders.action";
import { useSession } from "next-auth/react";
import { OrderCardProps } from "@/api/types/orders.type";
import { FaCarSide } from "react-icons/fa";
import Link from "next/link";
import { ImSpinner3 } from "react-icons/im";
import EmptyOrders from "../EmptyOrders/EmptyOrders";

export default function OrderCard() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [getAllOrders, setgetAllOrders] = useState<null | OrderCardProps[]>(
    null,
  );
  const { data: muSessionData, status } = useSession();
  const userId = muSessionData?.id;

  useEffect(() => {
    async function orders() {
      if (!userId) return;
      const res = await allOrders(userId);
      setgetAllOrders(res);
      console.log(res);
    }
    orders();
  }, [userId]);
  if (!getAllOrders) {
    return (
      <div className="mx-auto flex items-center justify-center h-screen">
        <ImSpinner3 className="animate-spin size-10 text-green-500" />
      </div>
    );
  }
  return (
    <>
      {getAllOrders?.length > 0 ? (
        <>
          <header className="bg-white from-green-600 via-green-500 to-green-400 text-white">
            <div className="container-[90%] mx-auto px-4 py-7 sm:py-16">
              <nav className="flex items-center gap-2 text-sm text-black mb-6">
                <Link href="/" className="hover:green-500 transition-colors">
                  Home
                </Link>
                <span className="text-black">/</span>
                <div className="hover:text-green-500 transition-colors">
                  My Orders
                </div>
              </nav>

              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl bg-[#1EBA58] backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30">
                  <FaBoxArchive className="text-white size-10" />
                </div>

                <div>
                  <h1 className="text-black text-3xl sm:text-4xl font-bold tracking-tight">
                    My Orders
                  </h1>
                  <p className="text-gray-500 mt-1">
                    Track and manage your {getAllOrders?.length} orders
                  </p>
                </div>
              </div>
            </div>
          </header>
          <section className="w-[97%] mx-auto">
            {getAllOrders?.map((order) => (
              <div key={order.id} className="p-4">
                <div className="bg-white rounded-2xl border transition-all duration-300 overflow-hidden border-green-200 shadow-lg shadow-green-100/50">
                  <div className="p-5 sm:p-6">
                    <div className="flex flex-col sm:flex-row gap-5">
                      {/* Product Image Thumb */}
                      <div className="relative shrink-0">
                        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 p-2.5 overflow-hidden">
                          <img
                            alt={order.cartItems[0].product.title}
                            className="w-full h-full object-contain"
                            src={order.cartItems[0].product.imageCover}
                          />
                        </div>
                      </div>

                      {/* Header Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div>
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-100 rounded-lg mb-2">
                              <FaCarSide className="w-3 h-3 text-blue-600" />
                              <span className="text-xs font-semibold text-blue-600">
                                On the way
                              </span>
                            </div>
                            <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                              <CiHashtag className="w-4 h-4 text-gray-400" />
                              {order.id}
                            </h3>
                          </div>
                          <div className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center bg-gray-100">
                            <CiMoneyBill className="w-5 h-5 text-gray-600" />
                          </div>
                        </div>

                        {/* Order Meta */}
                        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-4">
                          <span className="flex items-center gap-1.5">
                            <CalendarDays className="w-3.5 h-3.5 text-gray-400" />
                            {order.createdAt.split("T")[0]}
                          </span>
                          <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                          <span className="flex items-center gap-1.5">
                            <Box className="w-3.5 h-3.5 text-gray-400" />
                            {order.cartItems[0].count} items
                          </span>
                          <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                          <span className="flex items-center gap-1.5">
                            <FaLocationDot className="w-3.5 h-3.5 text-gray-400" />
                            {order.shippingAddress.city}
                          </span>
                        </div>

                        {/* Price and Toggle */}
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <span className="text-2xl font-bold text-gray-900">
                              {order.totalOrderPrice}
                            </span>
                            <span className="text-sm font-medium text-gray-400 ml-1">
                              EGP
                            </span>
                          </div>
                          <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="cursor-pointer flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-600/25"
                          >
                            {isExpanded ? "Hide" : "Show Details"}
                            <ChevronDown
                              className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expandable Section */}
                  {isExpanded && (
                    <div className="border-t border-gray-100 bg-gray-50/50">
                      <div className="p-5 sm:p-6">
                        <h4 className="font-semibold text-gray-900 text-sm flex items-center gap-2 mb-4">
                          <div className="w-6 h-6 rounded-lg bg-green-100 flex items-center justify-center">
                            <Receipt className="w-3.5 h-3.5 text-green-600" />
                          </div>
                          Order Items
                        </h4>
                        {order.cartItems.map((item) => (
                          <div key={item._id} className="space-y-3">
                            <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100">
                              <div className="w-16 h-16 rounded-xl bg-gray-50 p-2 shrink-0">
                                <img
                                  alt={item.product.title}
                                  className="w-full h-full object-contain"
                                  src={item.product.imageCover}
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-gray-900 truncate">
                                  {item.product.title}
                                </p>
                                <p className="text-sm text-gray-500 mt-1">
                                  <span className="font-medium text-gray-700">
                                    {item.count}
                                  </span>
                                  ×{item.price} EGP
                                </p>
                              </div>
                              <div className="text-right shrink-0">
                                <p className="text-lg font-bold text-gray-900">
                                  {item.count * item.price}
                                </p>
                                <p className="text-xs text-gray-400">EGP</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="px-5 sm:px-6 pb-5 sm:pb-6 grid sm:grid-cols-2 gap-4">
                        {/* Delivery Info */}
                        <div className="p-4 bg-white rounded-xl border border-gray-100">
                          <h4 className="font-semibold text-gray-900 text-sm flex items-center gap-2 mb-3">
                            <div className="w-6 h-6 rounded-lg bg-green-100 flex items-center justify-center">
                              <FaLocationDot className="w-3.5 h-3.5 text-green-600" />
                            </div>
                            Delivery Address
                          </h4>
                          <div className="space-y-2">
                            <p className="font-medium text-gray-900">
                              {order.shippingAddress.city}
                            </p>
                            <p className="text-sm text-gray-600 leading-relaxed">
                              {order.shippingAddress.details}
                            </p>
                            <p className="text-sm text-gray-600 flex items-center gap-2 pt-1">
                              <Phone className="w-3.5 h-3.5 text-gray-400" />
                              {order.shippingAddress.phone}
                            </p>
                          </div>
                        </div>

                        {/* Summary Info */}
                        <div className="p-4 rounded-xl bg-blue-100 border border-blue-200">
                          <h4 className="font-semibold text-gray-900 text-sm flex items-center gap-2 mb-3">
                            <div className="w-6 h-6 rounded-lg bg-blue-500 flex items-center justify-center">
                              <FaCarSide className="w-3.5 h-3.5 text-white" />
                            </div>
                            Order Summary
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between text-gray-600">
                              <span>Subtotal</span>
                              <span className="font-medium">
                                {order.totalOrderPrice} EGP
                              </span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                              <span>Shipping</span>
                              <span className="font-medium">Free</span>
                            </div>
                            <hr className="border-gray-200/50 my-2" />
                            <div className="flex justify-between pt-1">
                              <span className="font-semibold text-gray-900">
                                Total
                              </span>
                              <span className="font-bold text-lg text-gray-900">
                                {order.totalOrderPrice} EGP
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </section>
        </>
      ) : (
        <EmptyOrders />
      )}
    </>
  );
}
