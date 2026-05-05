import Link from "next/link";
import React from "react";
import { FaUser } from "react-icons/fa";
import Profile from "../_components/Profile/Profile";

export default function page() {
  return (
    <>
      <header className="bg-gradient-to-br from-green-600 via-green-500 to-green-400 text-white">
        <div className="container-[90%] mx-auto px-4 py-12 sm:py-16">
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-white/40">/</span>
            <Link
              href="/categories"
              className="hover:text-white transition-colors"
            >
              My Account
            </Link>
          </nav>

          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30">
              <FaUser size={40} />
            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                My Account
              </h1>
              <p className="text-white/80 mt-1">
                Manage your addresses and account settings
              </p>
            </div>
          </div>
        </div>
      </header>
      <Profile />
    </>
  );
}
