import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Aside from '../components/Aside'

const PortalLayout = () => {
  return (
    <div className="portal-wrapper">
      <Aside />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default PortalLayout