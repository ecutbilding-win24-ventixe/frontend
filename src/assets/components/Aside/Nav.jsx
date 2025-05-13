import React from 'react'

const Nav = () => {
  return (
    <nav className="nav-links">
      <a className="nav-link">
        <i class="fa-regular fa-grid-2"></i>
        <span className="nav-link-text">Dashboard</span>
      </a>

      <a className="nav-link">
        <i class="fa-regular fa-square-check"></i>
        <span className="nav-link-text">Bookings</span>
      </a>

      <a className="nav-link">
        <i class="fa-regular fa-ticket-simple"></i>
        <span className="nav-link-text">Events</span>
      </a>

      <a className="nav-link">
        <i class="fa-regular fa-users"></i>
        <span className="nav-link-text">User Profiles</span>
      </a>

      
    </nav>
  )
}

export default Nav