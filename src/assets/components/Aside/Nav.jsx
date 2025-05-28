import React from 'react'
import { NavLink } from 'react-router-dom'

const Nav = () => {
  return (
    <nav className="nav-links">
      <NavLink to="/" className="nav-link">
        <i className="fa-regular fa-grid-2"></i>
        <span className="nav-link-text">Dashboard</span>
      </NavLink>

      <NavLink to="/bookings" className="nav-link">
        <i className="fa-regular fa-square-check"></i>
        <span className="nav-link-text">Bookings</span>
      </NavLink>

      <NavLink to="/events" className="nav-link">
        <i className="fa-regular fa-ticket-simple"></i>
        <span className="nav-link-text">Events</span>
      </NavLink>

      <NavLink to="/users" className="nav-link">
        <i className="fa-regular fa-users"></i>
        <span className="nav-link-text">User Profiles</span>
      </NavLink>

      
    </nav>
  )
}

export default Nav