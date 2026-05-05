"use client";
import Link from "next/link";
import { Truck, Gift, Phone, Mail, User, UserPlus } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { FaSignOutAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const TopBar = () => {
  const { data: muSessionData, status } = useSession();
  function mySignOut() {
    // Clear Token From Cookies
    // Go To Login
    signOut({ redirect: true, callbackUrl: "/login" });
  }
  return (
    <div className="border-b border-gray-100 bg-white">
      <div className="container-[90%] mx-auto px-4">
        <div className="flex justify-between items-center h-10 text-xs sm:text-sm">
          <div className="hidden md:flex items-center gap-6 text-gray-500">
            <span className="flex items-center gap-2">
              <Truck size={14} className="text-green-600" />
              <span>Free Shipping on Orders 500 EGP</span>
            </span>
            <span className="flex items-center gap-2">
              <Gift size={14} className="text-green-600" />
              <span>New Arrivals Daily</span>
            </span>
          </div>

          <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
            <div className="flex items-center gap-4 text-gray-500">
              <a
                href="tel:+18001234567"
                className="flex items-center gap-1.5 hover:text-green-600 transition-colors"
              >
                <Phone size={12} />
                <span className="hidden sm:inline">+1 (800) 123-4567</span>
              </a>
              <a
                href="mailto:support@freshcart.com"
                className="flex items-center gap-1.5 hover:text-green-600 transition-colors"
              >
                <Mail size={12} />
                <span className="hidden sm:inline">support@freshcart.com</span>
              </a>
            </div>

            <span className="hidden sm:block w-px h-4 bg-gray-200"></span>
            {status === "unauthenticated" ? (
              <div className="flex items-center gap-4">
                <Link
                  href="/login"
                  className="flex items-center gap-1.5 text-gray-600 hover:text-green-600 transition-colors font-medium"
                >
                  <User size={14} />
                  <span>Sign In</span>
                </Link>
                <Link
                  href="/register"
                  className="flex items-center gap-1.5 text-gray-600 hover:text-green-600 transition-colors font-medium"
                >
                  <UserPlus size={14} />
                  <span>Sign Up</span>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  href="/profile"
                  className="flex items-center gap-1.5 text-gray-600 hover:text-green-600 transition-colors font-medium"
                >
                  <User size={14} />
                  <span>{muSessionData?.user.name}</span>
                </Link>
                <Button
                  onClick={mySignOut}
                  className="flex items-center gap-1.5 text-gray-600 bg-white cursor-pointer hover:text-red-600 transition-colors font-medium"
                >
                  <FaSignOutAlt size={14} />
                  <span>Sign Out</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
