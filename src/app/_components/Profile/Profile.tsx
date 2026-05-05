"use client";
import React from "react";
import { useSession } from "next-auth/react";

export default function Profile() {
  const { data: muSessionData, status } = useSession();
  return (
    <>
      <div className="py-3 h-[50%] bg-gray-1~00">
        <h1 className="ps-5 text-3xl text-black font-bold py-2">
          Profile Information
        </h1>
        <div className="w-[90%] md:w-[70%] mx-auto p-10 bg-green-200 rounded-2xl">
          <h3 className="text-2xl text-black font-bold py-2">Full Name :</h3>
          <h5 className="ps-13 md:ps-30 text-xl text-gray-700 font-bold py-2">
            {muSessionData?.user.name}
          </h5>
          <h3 className="text-2xl text-black font-bold py-2">
            Email Address :
          </h3>
          <h5 className="ps-13 md:ps-30 text-xl text-gray-700 font-bold py-2">
            {muSessionData?.user.email}
          </h5>
        </div>
      </div>
    </>
  );
}
