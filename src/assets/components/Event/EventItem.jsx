import React from 'react'
import { Link } from 'react-router-dom'

const EventItem = ({ item }) => {
  const price = item.packages?.[0]?.price || 'N/A';
  return (
      <div className="event-card">
        <div className="event-card-header">
          <img className="event-card-image" src={item.ImageUrl}></img>
        </div>

        <div className="event-card-content">
          <span className="event-card-date">
            {new Date(item.eventDate).toLocaleDateString()} - {new Date(item.eventDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} 
          </span>
          <div className="event-card-title">{item.name}</div>
          <div className="event-card-location">
            <i class="fa-thin fa-location-dot"></i>
            <span>{item.location}</span>
          </div>
        </div>

        <div className="event-card-footer">
          <Link to={`/events/${item.id}`} className="btn btn-link event-card-button">Info</Link>
          <div className="event-card-price">$ {price}</div>
        </div>
        
        
      </div>

  )
}

export default EventItem