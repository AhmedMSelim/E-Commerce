"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useForm, Controller } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { redirect, useParams, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { checkoutSchema, checkoutSchemaType } from "@/schemas/checkOut.schema";
import { onlinePayment } from "@/actions/checkout.action";
import { getLoggedUserCart } from "@/actions/cart.actions";
import { DataCart, product } from "@/api/types/cart.type";

export default function CheckoutPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id }: { id: string } = useParams();
  const [cartItems, setcartItems] = useState<DataCart | undefined>();
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "online">("cash");
  const form = useForm<checkoutSchemaType>({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
    },
    resolver: zodResolver(checkoutSchema),
  });
  const { handleSubmit, control } = form;

  async function mySubmit(data: checkoutSchemaType) {
    const res = await onlinePayment(id, "", data);
    if (res.status === "success") {
      window.location.href = res.session.url;
    }
  }

  useEffect(() => {
    async function getUserCart() {
      const res = await getLoggedUserCart();
      console.log(res);
      setcartItems(res.data);
    }
    getUserCart();
  }, []);

  // Mock Data for items

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen py-8">
      <div className="container-[95%] mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link className="hover:text-green-600 transition" href="/">
              Home
            </Link>
            <span className="text-gray-300">/</span>
            <Link className="hover:text-green-600 transition" href="/cart">
              Cart
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-medium">Checkout</span>
          </nav>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <span className="bg-gradient-to-br from-green-600 to-green-700 text-white w-12 h-12 rounded-xl flex items-center justify-center shadow-lg shadow-green-600/20">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 384 512"
                  >
                    <path d="M14 2.2C22.5-1.7 32.5-.3 39.6 5.8L80 40.4 120.4 5.8c9-7.7 22.3-7.7 31.2 0L192 40.4 232.4 5.8c9-7.7 22.2-7.7 31.2 0L304 40.4 344.4 5.8c7.1-6.1 17.1-7.5 25.6-3.6S384 14.6 384 24l0 464c0 9.4-5.5 17.9-14 21.8s-18.5 2.5-25.6-3.6l-40.4-34.6-40.4 34.6c-9 7.7-22.2 7.7-31.2 0l-40.4-34.6-40.4 34.6c-9 7.7-22.3 7.7-31.2 0L80 471.6 39.6 506.2c-7.1 6.1-17.1 7.5-25.6 3.6S0 497.4 0 488L0 24C0 14.6 5.5 6.1 14 2.2zM104 136c-13.3 0-24 10.7-24 24s10.7 24 24 24l176 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-176 0zM80 352c0 13.3 10.7 24 24 24l176 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-176 0c-13.3 0-24 10.7-24 24zm24-120c-13.3 0-24 10.7-24 24s10.7 24 24 24l176 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-176 0z" />
                  </svg>
                </span>
                Complete Your Order
              </h1>
              <p className="text-gray-500 mt-2">
                Review your items and complete your purchase
              </p>
            </div>
            <Link
              className="text-green-600 hover:text-green-700 font-medium flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-green-50 transition-all"
              href="/cart"
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 512 512"
              >
                <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288 480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 105.4-105.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
              </svg>
              Back to Cart
            </Link>
          </div>
        </div>

        <form onSubmit={handleSubmit(mySubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Form Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Address Section */}
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4 text-white">
                  <h2 className="text-lg font-bold flex items-center gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 512 512"
                    >
                      <path d="M277.8 8.6c-12.3-11.4-31.3-11.4-43.5 0l-224 208c-9.6 9-12.8 22.9-8 35.1S18.8 272 32 272l16 0 0 176c0 35.3 28.7 64 64 64l288 0c35.3 0 64-28.7 64-64l0-176 16 0c13.2 0 25-8.1 29.8-20.3s1.6-26.2-8-35.1l-224-208z" />
                    </svg>
                    Shipping Address
                  </h2>
                  <p className="text-green-100 text-sm mt-1">
                    Where should we deliver your order?
                  </p>
                </div>

                <div className="p-6 space-y-5">
                  <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl border border-green-100">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                      <svg
                        className="w-4 h-4 text-green-600"
                        fill="currentColor"
                        viewBox="0 0 512 512"
                      >
                        <path d="M256 512a256 256 0 1 0 0-512 256 256 0 1 0 0 512zM224 160a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm-8 64l48 0c13.3 0 24 10.7 24 24l0 88 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l24 0 0-64-24 0c-13.3 0-24-10.7-24-24s10.7-24 24-24z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-green-800 font-medium">
                        Delivery Information
                      </p>
                      <p className="text-xs text-green-600 mt-0.5">
                        Please ensure your address is accurate for smooth
                        delivery
                      </p>
                    </div>
                  </div>

                  {/* Input Fields */}

                  <Controller
                    name="city"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel
                          htmlFor="city"
                          className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                          City *
                        </FieldLabel>
                        <Input
                          type="text"
                          className="w-full px-4 py-3 border-2 rounded-xl border-gray-200 focus:border-green-500 focus:outline-none transition-all"
                          {...field}
                          id="city"
                          aria-invalid={fieldState.invalid}
                          placeholder="e.g. Cairo, Alexandria"
                          autoComplete="off"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <Controller
                    name="details"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel
                          htmlFor="details"
                          className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                          Street Address *
                        </FieldLabel>
                        <Input
                          type="text"
                          className="w-full px-4 py-3 border-2 rounded-xl border-gray-200 focus:border-green-500 focus:outline-none transition-all resize-none"
                          {...field}
                          id="details"
                          aria-invalid={fieldState.invalid}
                          placeholder="Street name, building number..."
                          autoComplete="off"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    name="phone"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel
                          htmlFor="tel"
                          className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                          Phone Number *
                        </FieldLabel>
                        <Input
                          type="tel"
                          className="w-full px-4 py-3 border-2 rounded-xl border-gray-200 focus:border-green-500 focus:outline-none transition-all"
                          {...field}
                          id="tel"
                          aria-invalid={fieldState.invalid}
                          placeholder="01xxxxxxxxx"
                          autoComplete="off"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </div>
              </div>

              {/* Payment Method Section */}
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4 text-white">
                  <h2 className="text-lg font-bold flex items-center gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 512 512"
                    >
                      <path d="M64 32C28.7 32 0 60.7 0 96L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-192c0-35.3-28.7-64-64-64L72 128c-13.3 0-24-10.7-24-24S58.7 80 72 80l384 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L64 32zM416 256a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
                    </svg>
                    Payment Method
                  </h2>
                  <p className="text-green-100 text-sm mt-1">
                    Choose how you&apos;d like to pay
                  </p>
                </div>

                <div className="p-6 space-y-4">
                  <button
                    disabled={true}
                    type="button"
                    onClick={() => setPaymentMethod("cash")}
                    className={`cursor-pointer w-full p-5 rounded-xl border-2 transition-all flex items-center gap-4 ${paymentMethod === "cash" ? "border-green-500 bg-green-50" : "border-gray-100 hover:bg-gray-50"}`}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${paymentMethod === "cash" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-400"}`}
                    >
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 512 512"
                      >
                        <path d="M64 64C28.7 64 0 92.7 0 128L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-256c0-35.3-28.7-64-64-64L64 64zm192 96a96 96 0 1 1 0 192 96 96 0 1 1 0-192z" />
                      </svg>
                    </div>
                    <div className="text-left flex-1">
                      <h3
                        className={`font-bold ${paymentMethod === "cash" ? "text-green-700" : "text-gray-900"}`}
                      >
                        Cash on Delivery
                      </h3>
                      <p className="text-sm text-gray-500">
                        Pay when your order arrives
                      </p>
                    </div>
                    {paymentMethod === "cash" && (
                      <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-white text-xs">
                        ✓
                      </div>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("online")}
                    className={`cursor-pointer w-full p-5 rounded-xl border-2 transition-all flex items-center gap-4 ${paymentMethod === "online" ? "border-green-500 bg-green-50" : "border-gray-100 hover:bg-gray-50"}`}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${paymentMethod === "online" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-400"}`}
                    >
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 512 512"
                      >
                        <path d="M0 128c0-35.3 28.7-64 64-64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zm64 80c0 13.3 10.7 24 24 24H424c13.3 0 24-10.7 24-24s-10.7-24-24-24H88c-13.3 0-24 10.7-24 24z" />
                      </svg>
                    </div>
                    <div className="text-left flex-1">
                      <h3
                        className={`font-bold ${paymentMethod === "online" ? "text-green-700" : "text-gray-900"}`}
                      >
                        Pay Online
                      </h3>
                      <p className="text-sm text-gray-500">
                        Secure payment with Stripe
                      </p>
                    </div>
                    {paymentMethod === "online" && (
                      <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-white text-xs">
                        ✓
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm sticky top-15">
                <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4 text-white">
                  <h2 className="text-lg font-bold flex items-center gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 448 512"
                    >
                      <path d="M160 80c0-35.3 28.7-64 64-64s64 28.7 64 64l0 48-128 0 0-48zm-48 48l-64 0c-26.5 0-48 21.5-48 48L0 384c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-208c0-26.5-21.5-48-48-48l-64 0 0-48c0-61.9-50.1-112-112-112S112 18.1 112 80l0 48z" />
                    </svg>
                    Order Summary
                  </h2>
                  <p className="text-green-100 text-sm mt-1">
                    {cartItems?.products.length} items
                  </p>
                </div>

                <div className="p-5">
                  <div className="space-y-4 max-h-40 overflow-y-auto mb-5 pr-2 custom-scrollbar">
                    {cartItems?.products.map((item) => (
                      <div
                        key={item._id}
                        className="flex items-center gap-3 p-3 rounded-xl bg-gray-50"
                      >
                        <img
                          src={item.product.imageCover}
                          alt={item.product.title}
                          className="w-14 h-14 object-contain bg-white rounded-lg border border-gray-100"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {item.product.title}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {item.count} × {item.price} EGP
                          </p>
                        </div>
                        <p className="text-sm font-bold text-gray-900">
                          {item.price * item.count} EGP
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 border-t border-gray-100 pt-4">
                    <div className="flex justify-between text-gray-600 text-sm">
                      <span>Subtotal</span>
                      <span className="font-medium">
                        {cartItems?.totalCartPrice} EGP
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-600 text-sm">
                      <span>Shipping</span>
                      <span className="text-green-600 font-semibold">FREE</span>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-lg font-bold text-gray-900">
                        Total
                      </span>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-green-600">
                          {cartItems?.totalCartPrice}
                        </span>
                        <span className="text-sm text-gray-500 ml-1">EGP</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="cursor-pointer w-full py-7 mt-6 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-600/20 active:scale-[0.98]"
                  >
                    Place Order
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
