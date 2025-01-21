"use client";
import React, { useEffect, useState } from "react";
import { FaHome, FaBook, FaInfoCircle, FaMapMarkerAlt, FaLock, FaPersonBooth } from "react-icons/fa";
import { Button } from "@mui/material";

const navItems = [
  { label: "Home", icon: <FaHome />, href: "/" },
  { label: "Course", icon: <FaBook />, href: "/course" },
  { label: "About Us", icon: <FaInfoCircle />, href: "/about" },
  { label: "Map", icon: <FaMapMarkerAlt />, href: "/map" },
];

const Header = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (typeof window !== undefined) {
      const user = localStorage.getItem("userType");
      setUser(user);
    }
  });

  const handleLogOut = ()=>{
    try{
      localStorage.removeItem("userType");
      localStorage.removeItem("token");
      window.location.reload();
    }catch(e){
      console.error('Error in logout', e);
    }
  }

  return (
    <header className=" bg-gray-100 shadow-lg fixed top-0 left-0 w-full z-50">
      <div className=" container mx-auto flex items-center justify-between py-3 px-6">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <img
            src="/logo.png" // Replace with your logo path
            alt="Logo"
            className="h-10 w-10 rounded-full shadow-md"
          />
          <h1 className="text-2xl font-bold tracking-wide font-serif">
            Stand Alone App
          </h1>
        </div>

        {/* Navigation Menu */}
        <nav>
          <ul className="hidden md:flex items-center space-x-6">
            {navItems.map((item, index) => (
              <li key={index} className="group">
                <a
                  href={item.href}
                  className="flex items-center space-x-2 ml-4 text-purple-800 font-medium text-lg hover:text-green-700 transition-all"
                >
                  <span className="text-xl  group-hover:scale-110 transition-transform">
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
            {typeof window !== undefined && localStorage && 
            localStorage?.getItem("token") ? (
              <a
                onClick={()=>handleLogOut()}
                className="flex hover:cursor-pointer items-center space-x-2 ml-4 text-purple-800 font-medium text-lg hover:text-green-700 transition-all"
              >
                <span className="text-xl  group-hover:scale-110 transition-transform"></span>
                <span>Log out</span>
              </a>
            ) : (
              <a
                href="/login"
                className="flex hover:cursor-pointer  items-center space-x-2 ml-4  text-purple-800 font-medium text-lg hover:text-green-700 transition-all"
              >
                <span className="text-xl  group-hover:scale-110 transition-transform"><FaLock/></span>
                <span>Log in</span>
              </a>
            )}
            {user==='admin' &&
              <a
              href="/admin"
              className="flex hover:cursor-pointer items-center space-x-2 ml-4 text-purple-800 font-medium text-lg hover:text-green-700 transition-all"
            >
              <span className="text-xl  group-hover:scale-110 transition-transform"><FaPersonBooth/></span>
              <span>Admin</span>
            </a>
            }
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="outlined"
            color="inherit"
            size="small"
            className="text-white border-white hover:bg-white hover:text-blue-600"
          >
            Menu
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
