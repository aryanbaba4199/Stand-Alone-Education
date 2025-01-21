"use client";
import Login from "@/Components/user/Login";
import Loginshow from "@/Components/user/Loginshow";
import React from "react";

const page = () => {
  return (
    <div className="flex justify-between items-center px-4">
      <div className="w-[60%]">
        <Loginshow />
      </div>
      <div className="w-[40%]">
        {" "}
        <Login />
      </div>
    </div>
  );
};

export default page;
