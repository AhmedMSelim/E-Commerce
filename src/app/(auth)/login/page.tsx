"use client";
import React from "react";
import FreshCartHero from "@/app/FreshCartHero/FreshCartHero";
import { Input } from "@/components/ui/input";
import { FaFacebook, FaGoogle, FaUserPlus } from "react-icons/fa";
import Image from "next/image";
import Sarah from "../../assets/images/review-author.png";
import { useForm, Controller } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
// import { myRegisterSchema, RegisterSchemaType } from "@/schemas/auth.schema";
// import { UserRegister } from "@/actions/auth.actions";
import { toast } from "sonner";
import { redirect, useRouter } from "next/navigation";
import { LoginSchemaType, myLoginSchema } from "@/schemas/auth.schema";
import { UserLogin } from "@/actions/auth.actions";
import { signIn } from "next-auth/react";

export default function Login() {
  const router = useRouter();
  const form = useForm<LoginSchemaType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(myLoginSchema),
  });

  const { handleSubmit, control } = form;

  async function mySubmit(data: LoginSchemaType) {
    // const isLoginSuccessfull = await UserLogin(data);
    const response = await signIn("credentials", {
      ...data,
      redirect: false,
      callbackUrl: "/",
    });
    if (response?.ok) {
      toast.success("Welcome Login Successfully! ❤️", {
        duration: 7000,
        position: "top-center",
      });
      router.push("/");
    } else {
      toast.error(response?.ok || "Can't Login Something went wrong! 👎", {
        duration: 3000,
        position: "top-center",
      });
    }
  }

  return (
    <>
      <div className="flex w-[98%] mx-auto">
        <div className="hidden lg:block py-15 w-1/2">
          <FreshCartHero />
        </div>
        {/*----------------------------------------------------------------------------------------*/}
        <div className="w-full lg:w-1/2 p-6">
          <div className="p-6 shadow-2xl rounded-2xl">
            <div className="text-center ">
              <h1 className="font-bold text-3xl">
                <span className="text-green-600">Fresh</span>Cart
              </h1>
              <h1 className="font-bold text-3xl">Welcome Back!</h1>
              <p className="text-[#364153] text-lg">
                Sign in to continue your fresh shopping experience
              </p>

              <div className="py-8 flex flex-col gap-3">
                <div className="w-full p-4 border-2 border-gray-300 text-center rounded-xl flex justify-center items-center gap-1 hover:bg-green-100 hover:border-green-500 transition-all cursor-pointer">
                  <FaGoogle className="text-red-600" />
                  Continue with Google
                </div>
                <div className="w-full p-4 border-2 border-gray-300 text-center rounded-xl flex justify-center items-center gap-1 hover:bg-green-100 hover:border-green-500 transition-all cursor-pointer">
                  <FaFacebook className="text-blue-700" />
                  Continue with Facebook
                </div>
              </div>
              <div className="flex justify-between items-center pb-5">
                <hr className="w-[25%] border-1" />
                <span className=" text-gray-600">OR CONTINUE WITH EMAIL</span>
                <hr className="w-[25%] border-1" />
              </div>
            </div>
            <form onSubmit={handleSubmit(mySubmit)}>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email" className="text-xl pt-7">
                      Email Address
                    </FieldLabel>
                    <Input
                      type="email"
                      className="p-5 rounded-lg placeholder:text-lg text-xl!"
                      {...field}
                      id="email"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter Your Email"
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
                    <div className="flex justify-between items-center">
                      <FieldLabel htmlFor="password" className="text-xl pt-7">
                        Password
                      </FieldLabel>
                      <span className="text-green-600 hover:text-green-700 transition-colors cursor-pointer pt-7">
                        ForgetPassword?
                      </span>
                    </div>
                    <Input
                      type="password"
                      className="p-5 rounded-lg placeholder:text-lg text-xl!"
                      {...field}
                      id="password"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter Your Password"
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
                  className="accent-green-600 cursor-pointer size-5"
                />
                <span className="text-lg font-bold ">Keep me signed in</span>
              </div>
              <Button
                type="submit"
                className="w-full p-6 text-xl cursor-pointer bg-green-600 hover:bg-green-700 transition-colors"
              >
                Sign in
              </Button>
              <hr className="my-5" />
              <div className="flex flex-wrap justify-center items-center gap-2 text-lg">
                <span>New to FreshCart? </span>
                <Link
                  className="text-green-600 hover:text-green-700 transition-colors"
                  href="/register"
                >
                  Create an account
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
