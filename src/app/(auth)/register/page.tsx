"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { FaFacebook, FaGoogle, FaUserPlus } from "react-icons/fa";
import Image from "next/image";
import Sarah from "../../assets/images/review-author.png";
import { useForm, Controller } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { myRegisterSchema, RegisterSchemaType } from "@/schemas/auth.schema";
import { UserRegister } from "@/actions/auth.actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const features = [
  {
    title: "Premium Quality",
    desc: "Premium quality products sourced from trusted suppliers.",
    icon: (
      <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3L288.1 439.8 416.2 508.3c10.8 5.7 23.9 4.8 33.8-2.3s14.9-19.3 12.9-31.3L438.3 329 542.4 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
    ),
  },
  {
    title: "Fast Delivery",
    desc: "Same-day delivery available in most areas",
    icon: (
      <path d="M0 128C0 92.7 28.7 64 64 64H432h16 48 31.3c14.5 0 28.5 5.8 38.7 16l61.7 61.7c10.2 10.2 16 24.1 16 38.7V352c0 35.3-28.7 64-64 64H544c0 44.2-35.8 80-80 80s-80-35.8-80-80H192c0 44.2-35.8 80-80 80s-80-35.8-80-80H64c-35.3 0-64-28.7-64-64V128zm64 192v48H90.4c12.1-18.9 33.2-32 57.6-32s45.5 13.1 57.6 32H384V128H64v64H192v48H64v64H192v48H64zM464 160h-16V288h128V232.4L515.6 172.4c-3-3-7.1-4.4-11.3-4.4H464zM184 432a24 24 0 1 0 -48 0 24 24 0 1 0 48 0zm328 24a24 24 0 1 0 0-48 24 24 0 1 0 0 48z" />
    ),
  },
  {
    title: "Secure Shopping",
    desc: "Your data and payments are completely secure",
    icon: (
      <path d="M256 0c4.6 0 9.2 1 13.4 2.9L457.8 82.8c22 9.3 38.4 31 38.3 57.2-.5 99.2-41.3 280.7-213.6 363.2-16.7 8-36.1 8-52.8 0-172.4-82.5-213.1-264-213.6-363.2-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.9 1 251.4 0 256 0zm0 66.8l0 378.1c138-66.8 175.1-214.8 176-303.4l-176-74.6 0 0z" />
    ),
  },
];

// https://ecommerce.routemisr.com/api/v1/auth/signup

export default function Register() {
  const router = useRouter();
  const form = useForm<RegisterSchemaType>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },
    resolver: zodResolver(myRegisterSchema),
  });

  const { handleSubmit, control } = form;

  async function mySubmit(data: RegisterSchemaType) {
    console.log(data);
    const isRegisterdSuccessfull = await UserRegister(data);
    if (isRegisterdSuccessfull) {
      toast.success("Your account has been successfully created ✅", {
        duration: 7000,
        position: "top-center",
      });
      router.push("/login");
    } else {
      toast.error("Can't Something went wrong! ❌", {
        duration: 3000,
        position: "top-center",
      });
    }
  }
  return (
    <>
      <div className="w-[98%] mx-auto">
        <div className="flex flex-wrap pb-8">
          <div className="w-full md:w-1/2 py-6 pe-6">
            <h1 className="text-2xl md:text-4xl font-bold">
              Welcome to <span className="text-green-600">FreshCart</span>
            </h1>
            <p className="text-xl mt-2 mb-4 text-gray-700">
              Join thousands of happy customers who enjoy fresh groceries
              delivered right to their doorstep.
            </p>

            <ul className="space-y-6 my-8">
              {features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <div className="size-12 shrink-0 bg-green-100 text-green-600 rounded-full flex justify-center items-center">
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 640 512"
                    >
                      {feature.icon}
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">{feature.title}</h2>
                    <p className="text-gray-600">{feature.desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="bg-white border border-gray-100 shadow-sm p-6 rounded-xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative size-12">
                  <Image
                    src={Sarah}
                    alt="Sarah Johnson"
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Sarah Johnson</h3>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <blockquote className="italic text-gray-600 leading-relaxed">
                FreshCart has transformed my shopping experience. The quality of
                the products is outstanding, and the delivery is always on time.
                Highly recommend!
              </blockquote>
            </div>
          </div>
          <div className="w-full md:w-1/2 p-6">
            <div className="p-6 shadow-2xl rounded-2xl">
              <div className="text-center ">
                <h1 className="font-bold text-3xl">Create Your Account</h1>
                <p className="text-[#364153] text-lg">
                  Start your fresh journey with us today
                </p>

                <div className="flex justify-between py-8">
                  <div className="w-[49%] p-2 border border-gray-300 text-center rounded-xl flex justify-center items-center gap-1 hover:bg-gray-100 transition-colors cursor-pointer">
                    <FaGoogle className="text-red-600" />
                    Google
                  </div>
                  <div className="w-[49%] p-2 border border-gray-300 text-center rounded-xl flex justify-center items-center gap-1 hover:bg-gray-100 transition-colors cursor-pointer">
                    <FaFacebook className="text-blue-700" />
                    Facebook
                  </div>
                </div>
                <div className="flex justify-between items-center pb-5">
                  <hr className="w-[45%] border-1" />
                  <span className="font-bold text-xl text-gray-600">or</span>
                  <hr className="w-[45%] border-1" />
                </div>
              </div>
              <form onSubmit={handleSubmit(mySubmit)}>
                {/* <Input /> */}
                <Controller
                  name="name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="nameInput" className="text-xl pt-7">
                        Name*
                      </FieldLabel>
                      <Input
                        type="text"
                        className="p-5 rounded-lg placeholder:text-lg text-xl!"
                        {...field}
                        id="nameInput"
                        aria-invalid={fieldState.invalid}
                        placeholder="Ahmed Magdy"
                        autoComplete="off"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="email" className="text-xl pt-7">
                        Email*
                      </FieldLabel>
                      <Input
                        type="email"
                        className="p-5 rounded-lg placeholder:text-lg text-xl!"
                        {...field}
                        id="email"
                        aria-invalid={fieldState.invalid}
                        placeholder="ahmed@example.com"
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
                      <FieldLabel htmlFor="phone" className="text-xl pt-7">
                        Phone*
                      </FieldLabel>
                      <Input
                        type="tel"
                        className="p-5 rounded-lg placeholder:text-lg text-xl!"
                        {...field}
                        id="phone"
                        aria-invalid={fieldState.invalid}
                        placeholder="+1 234 567 8900"
                        autoComplete="off"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="password"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="password" className="text-xl pt-7">
                        Password*
                      </FieldLabel>
                      <Input
                        type="password"
                        className="p-5 rounded-lg placeholder:text-lg text-xl!"
                        {...field}
                        id="password"
                        aria-invalid={fieldState.invalid}
                        placeholder="Create a strong password"
                        autoComplete="off"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="rePassword"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="rePassword" className="text-xl pt-7">
                        Confirm Password*
                      </FieldLabel>
                      <Input
                        type="password"
                        className="p-5 rounded-lg placeholder:text-lg text-xl!"
                        {...field}
                        id="rePassword"
                        aria-invalid={fieldState.invalid}
                        placeholder="Confirm Your Password"
                        autoComplete="off"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <div className="flex items-center gap-2 md:gap-4 py-7">
                  <input
                    type="checkbox"
                    name="terms"
                    id="terms"
                    className="accent-green-600 cursor-pointer md:size-5 mb-5 md:mb-0"
                  />
                  <span className="text-sm md:text-lg font-bold ">
                    I agree to the
                    <span className="text-green-600">Terms of Service </span>
                    and <span className="text-green-600">Privacy Policy </span>*
                  </span>
                </div>
                <Button
                  type="submit"
                  className="w-full p-6 text-xl cursor-pointer bg-green-600 hover:bg-green-700 transition-colors"
                >
                  <FaUserPlus />
                  Create My Account
                </Button>
                <hr className="my-5" />
                <div className="flex flex-wrap justify-center items-center gap-2 text-lg">
                  <span>Already have an account? </span>
                  <Link
                    className="text-green-600 hover:text-green-700 transition-colors"
                    href="/login"
                  >
                    Sign In
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
