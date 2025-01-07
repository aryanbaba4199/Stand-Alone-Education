"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const NavMenu = () => {
  const router = useRouter();

  return (
    <div className="bg-gradient-to-tr from-slate-900 via-yellow-900 to-cyan-900 h-12 px-4 flex justify-start items-center">
      <div>
        <img
          src="https://i.pinimg.com/736x/a4/70/12/a47012d20bf714a424441cb350e8e7b2.jpg"
          width={50}
          height={50}
          className="w-12 h-12 rounded-full p-1"
        />
      </div>
      <div
        onClick={() => router.push("/")}
        className="flex justify-center items-center ml-4"
      >
        <p className="text-xl font-bold hover:cursor-pointer text-white">
          Talkmatez Pvt Ltd
        </p>
      </div>
      {typeof window !== "undefined" &&
        localStorage.getItem("userType") === "admin" && (
          <div className="flex justify-end w-[80%] text-white">
            <Link
              className="bg-gray-200 text-gray-900 px-4 p-1 rounded-md hover:bg-cyan-100"
              href="/admin"
            >
              Admin
            </Link>
          </div>
        )}
    </div>
  );
};

export default NavMenu;
