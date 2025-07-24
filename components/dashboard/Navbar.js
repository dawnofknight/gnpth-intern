"use client";

import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { Search, Filter } from "lucide-react";

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <nav className="bg-[#2F4858] text-white px-6 py-6 flex items-center justify-between relative rounded-b-2xl">
      {/* Tombol segitiga */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className={`w-0 h-0 border-l-[12px] border-r-[12px] border-b-[18px] border-transparent border-b-[#F7F2E0] transition-transform duration-300 
          ${sidebarOpen ? "rotate-90" : "rotate-0"}`}
      />

      {/* Search bar tetap di tengah (secara absolut) */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-10">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search by keywords"
            className="bg-[#F7F3D6] text-[#97AEA1] px-4 py-2 rounded-md w-full pr-20"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2 text-[#5A7D74]">
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2 text-[#5A7D74]">
              <button
                onClick={() => console.log("Search clicked")}
                className="p-1 rounded-md hover:scale-110 active:scale-90 transition-transform duration-150"
              >
                <Search className="w-4 h-4" />
              </button>

              <button
                onClick={() => console.log("Filter clicked")}
                className="p-1 rounded-md hover:scale-110 active:scale-90 transition-transform duration-150"
              >
                <Filter className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* User Info di kanan */}
      <div className="flex items-center gap-2 ml-auto max-w-[200px] truncate">
        <p className="text-white truncate">Hi, Diluc Ragnvindr!</p>
        <img
          src="/images/Diluc.png"
          alt="User profile"
          className="w-12 h-12 rounded-full object-cover"
        />
      </div>
    </nav>
  );
}
