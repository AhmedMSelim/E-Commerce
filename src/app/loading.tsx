import React from "react";
import { PropagateLoader } from "react-spinners";

export default function loading() {
  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <PropagateLoader color="#5af215" />
      </div>
    </>
  );
}
