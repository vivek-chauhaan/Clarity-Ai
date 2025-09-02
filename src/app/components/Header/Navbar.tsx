"use client";
import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faUser } from "@fortawesome/free-solid-svg-icons";
// import Image from "next/image";
// import logo from "@/asstes/aibot.png";
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    if (dropdownOpen) setDropdownOpen(false); // Auto-close dropdown if open
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
    if (menuOpen) setMenuOpen(false); // Auto-close mobile drawer if open
  };

  return (
    <nav className="bg-[#122022] fixed border-b shadow-lg top-0 h-16 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            {/* <Image src={logo} alt="Logo" width={150} height={100} /> */}
            <span className="text-2xl font-bold text-green-400">
              Clarity-Ai
            </span>
          </div>

          {/* Desktop Menu */}

          <div className="hidden md:flex space-x-8">
            <Link
              href="/text-summarize"
              className="relative text-gray-300 font-semibold group"
            >
              Text Summarizer
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-green-400 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
            </Link>
            <Link
              href="/aichat"
              className="relative text-gray-300 font-semibold group"
            >
              AI Chat
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-green-400 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
            </Link>
            <Link
              href="/translation"
              className="relative text-gray-300 font-semibold group"
            >
              Translation
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-green-400 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
            </Link>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            {/* User Dropdown */}
            <button
              onClick={toggleDropdown}
              aria-label="User Menu"
              className="text-gray-300  focus:outline-none"
            >
              <FontAwesomeIcon icon={faUser} className="cursor-pointer" />
            </button>

            {/* Hamburger */}
            <button
              onClick={toggleMenu}
              className="md:hidden text-gray-300  cursor-pointer focus:outline-none"
              aria-label="Menu"
            >
              <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} size="lg" />
            </button>
          </div>
        </div>
      </div>

      {/* Dropdown Menu */}
      {dropdownOpen && (
        <div className="absolute  right-4 top-16 w-40 bg-white border rounded-md shadow-lg z-50">
          <button className="block cursor-pointer w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
            Login
          </button>
          <button className="block cursor-pointer w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
            Signup
          </button>
        </div>
      )}

      {/* Mobile Menu (Fixed & Always Rendered for Smooth Animation) */}
      <div
        className={`md:hidden fixed inset-0 z-40 ${
          menuOpen ? "" : "pointer-events-none"
        }`}
      >
        {/* Background Overlay */}
        <div
          onClick={() => setMenuOpen(false)}
          className={`fixed inset-0  bg-transparent bg-opacity-30 transition-opacity duration-300 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
        ></div>

        {/* Sliding Drawer */}
        <div
          className={`fixed top-0 right-0 h-full w-1/2 bg-[#122022] shadow-lg transform transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-4 py-4 border-b">
            {/* <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="text-xl font-bold text-blue-600"
            >
              AI Tools
            </Link> */}
            <button
              onClick={() => setMenuOpen(false)}
              className="text-gray-300  text-2xl focus:outline-none"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          <div className="flex flex-col space-y-4 mt-8 px-4">
            <Link
              href="/summarize"
              onClick={() => setMenuOpen(false)}
              className="text-gray-300  font-semibold"
            >
              Text Summarizer
            </Link>
            <Link
              href="/chat"
              onClick={() => setMenuOpen(false)}
              className="text-gray-300  font-semibold"
            >
              AI Chat
            </Link>
            <Link
              href="/translate"
              onClick={() => setMenuOpen(false)}
              className="text-gray-300  font-semibold"
            >
              Translation
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
