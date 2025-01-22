"use client";
import React, { useEffect, useState } from "react";
import { FaBars, FaTimes, FaHome, FaBook, FaInfoCircle, FaMapMarkerAlt, FaLock, FaPersonBooth } from "react-icons/fa";

const navItems = [
  { label: "Home", icon: <FaHome />, href: "/" },
  { label: "About Us", icon: <FaInfoCircle />, href: "/about" },
  { label: "Map", icon: <FaMapMarkerAlt />, href: "/map" },
];

const Header = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== undefined) {
      const user = localStorage.getItem("userType");
      const token = localStorage.getItem("token");
      setToken(token);
      setUser(user);
    }
  }, []);

  const handleLogOut = () => {
    try {
      localStorage.removeItem("userType");
      localStorage.removeItem("token");
      window.location.reload();
    } catch (e) {
      console.error("Error in logout", e);
    }
  };

  return (
    <header className="bg-gray-100 shadow-lg fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex items-center justify-between py-3 px-6">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <img
            src="/logo.png" // Replace with your logo path
            alt="Logo"
            className="h-10 w-10 rounded-full shadow-md"
          />
          <h1 className="text-2xl font-bold tracking-wide font-serif">
            Stand Alone 
          </h1>
        </div>

        {/* Desktop Navigation Menu */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="flex items-center space-x-2 text-purple-800 font-medium text-lg hover:text-green-700 transition-all"
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </a>
          ))}

          {/* Conditional Course Button */}
          {token && (
            <a
              href="/course"
              className="flex items-center space-x-2 text-purple-800 font-medium text-lg hover:text-green-700 transition-all"
            >
              <FaBook className="text-xl" />
              <span>Course</span>
            </a>
          )}

          {/* Log in/Log out Button */}
          {token ? (
            <button
              onClick={handleLogOut}
              className="text-purple-800 font-medium text-lg hover:text-green-700 transition-all"
            >
              Log out
            </button>
          ) : (
            <a
              href="/login"
              className="text-purple-800 font-medium text-lg hover:text-green-700 transition-all"
            >
              <FaLock className="inline-block mr-2" />
              Log in
            </a>
          )}

          {/* Admin Button */}
          {user === "admin" && (
            <a
              href="/admin"
              className="text-purple-800 font-medium text-lg hover:text-green-700 transition-all"
            >
              <FaPersonBooth className="inline-block mr-2" />
              Admin
            </a>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-purple-800 text-2xl focus:outline-none"
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="bg-gray-100 shadow-lg md:hidden">
          <nav className="flex flex-col items-start p-4 space-y-4">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="flex items-center space-x-2 text-purple-800 font-medium text-lg hover:text-green-700 transition-all"
                onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.label}</span>
              </a>
            ))}

            {/* Conditional Course Button */}
            {token && (
              <a
                href="/course"
                className="flex items-center space-x-2 text-purple-800 font-medium text-lg hover:text-green-700 transition-all"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FaBook className="text-xl" />
                <span>Course</span>
              </a>
            )}

            {/* Log in/Log out Button */}
            {token ? (
              <button
                onClick={() => {
                  handleLogOut();
                  setIsMobileMenuOpen(false);
                }}
                className="text-purple-800 font-medium text-lg hover:text-green-700 transition-all"
              >
                Log out
              </button>
            ) : (
              <a
                href="/login"
                className="text-purple-800 font-medium text-lg hover:text-green-700 transition-all"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FaLock className="inline-block mr-2" />
                Log in
              </a>
            )}

            {/* Admin Button */}
            {user === "admin" && (
              <a
                href="/admin"
                className="text-purple-800 font-medium text-lg hover:text-green-700 transition-all"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FaPersonBooth className="inline-block mr-2" />
                Admin
              </a>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
