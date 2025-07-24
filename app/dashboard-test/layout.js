
import Footer from '../../components/dashboard/Footer'
import Navbar from '../../components/dashboard/Navbar'
import React from 'react'

export default function DashboardLayout({ children }) {
  return (
    <section>
            <div className="flex items-center justify-center bg-gradient-to-b from-[#FFF9E5] to-[#496A71] min-h-screen"></div>

        <Navbar />
      {children}

    </section>
  )
}