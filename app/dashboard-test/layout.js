// import Navbar from "@/components/dashboard/Navbar";
// import Footer from "@/components/dashboard/Footer";
import React from "react";

export default function DashboardLayout({ children }) {
  return (
    <section className="min-h-screen flex flex-col bg-gradient-to-b from-[#FFF9E5] to-[#496A71]">
      {/* <Navbar /> */}
      <main className="flex-1 container mx-auto px-4 py-8">{children}</main>
      {/* <Footer /> */}
    </section>
  );
}
