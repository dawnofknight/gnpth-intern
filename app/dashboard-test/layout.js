
import Footer from '../../components/dashboard/Footer'
import Navbar from '../../components/dashboard/Navbar'
import React from 'react'

export default function DashboardLayout({ children }) {
  return (
    <section>
        <Navbar />
      {children}
      <Footer />
    </section>
  )
}