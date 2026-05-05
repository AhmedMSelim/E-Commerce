import React from "react";
import { RingLoader } from "react-spinners";

export default function loading() {
  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <RingLoader color="#25e717" />
      </div>
    </>
  );
}
