"use client";

import { useState, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import fresh from "../../../../public/freshcart-logo.49f1b44d.svg";
import {
  Search,
  ChevronDown,
  Heart,
  ShoppingCart,
  User,
  Menu,
  X,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { MdOutlineAccountCircle } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { FaBox, FaSignOutAlt } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { IoCartOutline } from "react-icons/io5";
import { CartContext } from "@/context/CartContext";
import { WishlistContext } from "@/context/WishlistContext";

const Header = () => {
  const { numberOfCartItems, setnumberOfCartItems } = useContext(CartContext);
  const { numberOfWishlistItems, setnumberOfWishlistItems } =
    useContext(WishlistContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const { data: muSessionData, status } = useSession();
  function mySignOut() {
    // Clear Token From Cookies
    // Go To Login
    signOut({ redirect: true, callbackUrl: "/login" });
  }

  return (
    <>
      <header className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="bg-white">
          <div className="container-[90%] mx-auto px-4">
            <div className="flex items-center justify-between h-16 lg:h-[72px] gap-4 lg:gap-8">
              {/* Logo */}
              <Link href="/" className="shrink-0">
                <Image
                  src={fresh}
                  alt="FreshCart"
                  width={160}
                  height={31}
                  className="h-6 lg:h-8 w-auto"
                  priority
                />
              </Link>

              <form className="hidden lg:flex flex-1 max-w-2xl">
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Search for products, brands and more..."
                    className="w-full px-5 py-3 pr-12 rounded-full border border-gray-200 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600 transition-all text-sm"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-green-600 text-white flex items-center justify-center hover:bg-green-700 transition-colors"
                  >
                    <Search size={16} />
                  </button>
                </div>
              </form>

              <nav className="hidden sm:flex items-center gap-6">
                <Link
                  href="/"
                  className="text-gray-700 hover:text-green-600 font-medium transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/shop"
                  className="text-gray-700 hover:text-green-600 font-medium transition-colors"
                >
                  Shop
                </Link>
                <div className="relative group">
                  <button className="flex items-center gap-1.5 text-gray-700 hover:text-green-600 font-medium transition-colors py-2">
                    Categories
                    <ChevronDown
                      size={14}
                      className="transition-transform group-hover:rotate-180"
                    />
                  </button>
                  <div className="absolute top-full left-0 pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="bg-white border border-gray-100 rounded-xl shadow-xl py-2 min-w-[200px]">
                      <Link
                        className="block px-4 py-2.5 text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors"
                        href="/categories"
                      >
                        All Categories
                      </Link>
                      <Link
                        className="block px-4 py-2.5 text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors"
                        href="/categories/6439d2d167d9aa4ca970649f"
                      >
                        Electronics
                      </Link>
                      <Link
                        className="block px-4 py-2.5 text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors"
                        href="/categories/6439d58a0049ad0b52b9003f"
                      >
                        Womens Fashion
                      </Link>
                      <Link
                        className="block px-4 py-2.5 text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors"
                        href="/categories/6439d5b90049ad0b52b90048"
                      >
                        Mens Fashion
                      </Link>
                      <Link
                        className="block px-4 py-2.5 text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors"
                        href="/categories/6439d30b67d9aa4ca97064b1"
                      >
                        Beauty & Healthy
                      </Link>
                    </div>
                  </div>
                </div>
                <Link
                  href="/brands"
                  className="text-gray-700 hover:text-green-600 font-medium transition-colors"
                >
                  Brands
                </Link>
              </nav>

              <div className="flex items-center gap-1 lg:gap-2">
                <Link
                  href="/wishlist"
                  className="relative p-2.5 rounded-full hover:bg-gray-100 transition-colors group"
                  title="Wishlist"
                >
                  <Heart
                    size={22}
                    className="text-gray-500 group-hover:text-red-600 transition-colors"
                  />
                  {numberOfWishlistItems !== 0 && (
                    <div className="flex justify-center items-center bg-red-600 size-5 rounded-full absolute top-[3px] end-[2px] text-white font-bold">
                      {numberOfWishlistItems}
                    </div>
                  )}
                </Link>

                <Link
                  href="/cart"
                  className="relative p-2.5 rounded-full hover:bg-gray-100 transition-colors group"
                  title="Cart"
                >
                  <ShoppingCart
                    size={22}
                    className="text-gray-500 group-hover:text-green-600 transition-colors"
                  />
                  {numberOfCartItems !== 0 && (
                    <div className="flex justify-center items-center bg-emerald-600 size-5 rounded-full absolute top-[3px] end-[2px] text-white font-bold">
                      {numberOfCartItems}
                    </div>
                  )}
                </Link>
                {status === "unauthenticated" ? (
                  <Link
                    href="/login"
                    className="hidden lg:flex items-center gap-2 ml-2 px-5 py-2.5 rounded-full bg-green-600 hover:bg-green-700 text-white text-sm font-semibold transition-colors shadow-sm"
                  >
                    <User size={14} /> Sign In
                  </Link>
                ) : (
                  <div className="relative group pb-1">
                    <div className="hidden lg:flex items-center gap-2 ml-2 rounded-full hover:text-green-700 font-semibold transition-colors shadow-sm">
                      <MdOutlineAccountCircle size={30} />
                    </div>
                    <div className="absolute top-full right-0 pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <div className="bg-white border border-gray-100 rounded-xl shadow-xl py-2 min-w-[250px]">
                        <div className="flex items-center">
                          <div className="ps-2 text-green-500">
                            <MdOutlineAccountCircle
                              size={30}
                              className="bg-green-200 p-1 rounded-full"
                            />
                          </div>
                          <div>
                            <div className="block px-4 text-sm text-black font-bold hover:text-green-600 transition-colors">
                              {muSessionData?.user.name}
                            </div>
                            <div className="block px-4 text-sm text-gray-600 hover:text-green-600 transition-colors">
                              {muSessionData?.user.email}
                            </div>
                          </div>
                        </div>
                        <hr className="my-2 w-[95%] mx-auto" />
                        <Link
                          href="/profile"
                          className="block px-4 py-2 text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors"
                        >
                          <div className="flex gap-3 items-center">
                            <FiUser /> <span>My Profile</span>
                          </div>
                        </Link>
                        <Link
                          href="/allorders"
                          className="block px-4 py-2 text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors"
                        >
                          <div className="flex gap-3 items-center">
                            <FaBox /> <span>My Orders</span>
                          </div>
                        </Link>
                        <Link
                          href="/cart"
                          className="block px-4 py-2 text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors"
                        >
                          <div className="flex gap-3 items-center">
                            <IoCartOutline /> <span>My Cart</span>
                          </div>
                        </Link>
                        <Link
                          href="/wishlist"
                          className="block px-4 py-2 text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors"
                        >
                          <div className="flex gap-3 items-center">
                            <Heart size={15} /> <span>My Wishlist</span>
                          </div>
                        </Link>
                        <Button
                          onClick={mySignOut}
                          className="flex px-4 items-center gap-1.5 text-gray-600 bg-white cursor-pointer hover:text-red-600 transition-colors font-medium"
                        >
                          <FaSignOutAlt size={14} />
                          <span>Sign Out</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  onClick={toggleMenu}
                  className="lg:hidden ml-1 w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center transition-colors"
                >
                  <Menu size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 lg:hidden ${isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={toggleMenu}
      />

      <div
        className={`fixed inset-y-0 left-0 w-72 bg-white z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <span className="font-bold text-green-600 text-lg">
              FreshCart Menu
            </span>
            <button
              onClick={toggleMenu}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <nav className="flex flex-col gap-4">
              <Link
                href="/"
                onClick={toggleMenu}
                className="text-gray-700 font-medium border-b border-gray-50 py-2 px-4 cursor-pointer transition-colors hover:bg-green-100  rounded-2xl"
              >
                Home
              </Link>
              <Link
                href="/allorders"
                onClick={toggleMenu}
                className="text-gray-700 font-medium border-b border-gray-50 py-2 px-4 cursor-pointer transition-colors hover:bg-green-100  rounded-2xl"
              >
                My Orders
              </Link>
              <Link
                href="/shop"
                onClick={toggleMenu}
                className="text-gray-700 font-medium border-b border-gray-50 py-2 px-4 cursor-pointer transition-colors hover:bg-green-100  rounded-2xl"
              >
                Shop
              </Link>
              <Link
                href="/categories"
                onClick={toggleMenu}
                className="text-gray-700 font-medium border-b border-gray-50 py-2 px-4 cursor-pointer transition-colors hover:bg-green-100  rounded-2xl"
              >
                Categories
              </Link>
              <Link
                href="/brands"
                onClick={toggleMenu}
                className="text-gray-700 font-medium border-b border-gray-50 py-2 px-4 cursor-pointer transition-colors hover:bg-green-100  rounded-2xl"
              >
                Brands
              </Link>
            </nav>

            <div className="">
              <div className="flex items-center cursor-pointer hover:bg-green-100 transition-colors p-2 rounded-2xl">
                <Link
                  href="/wishlist"
                  className="relative p-2.5 rounded-full group"
                  title="Wishlist"
                >
                  <Heart size={22} className="text-red-600" />
                </Link>
                <span className="text-black font-bold">Wishlist</span>
              </div>

              <div className="flex items-center cursor-pointer hover:bg-green-100 transition-colors p-2 rounded-2xl">
                <Link
                  href="/cart"
                  className="relative p-2.5 rounded-full group"
                  title="Cart"
                >
                  <ShoppingCart
                    size={22}
                    className="text-green-600 group-hover:text-green-600 transition-colors"
                  />
                </Link>
                <span className="text-black font-bold">Cat</span>
              </div>
            </div>
            {status === "unauthenticated" ? (
              <div className="flex  justify-between items-center">
                <div className="pt-4">
                  <Link
                    href="/login"
                    onClick={toggleMenu}
                    className="flex items-center hover:bg-green-800 justify-center h-15 w-28 gap-2 bg-green-600 text-white rounded-xl font-semibold transition-colors"
                  >
                    Sign In
                  </Link>
                </div>
                <div className="pt-4">
                  <Link
                    href="/register"
                    onClick={toggleMenu}
                    className="flex items-center transition-colors border-2 hover:bg-green-100 border-green-700 h-15 w-28 justify-center gap-2 bg-white text-green-700  rounded-xl font-semibold"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  href="/profile"
                  className="text-lg flex items-center gap-1.5 text-gray-600 hover:text-green-600 transition-colors font-medium  cursor-pointer hover:bg-green-100 p-4 rounded-2xl"
                >
                  <User size={20} />
                  <span>{muSessionData?.user.name}</span>
                </Link>
                <div className="p-4 cursor-pointer transition-colors hover:bg-green-100  rounded-2xl">
                  <Button
                    onClick={mySignOut}
                    className="w-fit text-lg  bg-transparent hover:bg-green-100 text-gray-600 gap-1.5 hover:text-red-600 font-medium flex items-center"
                  >
                    <FaSignOutAlt size={20} />
                    <span>Sign Out</span>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
