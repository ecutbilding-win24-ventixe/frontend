import React from 'react'
import EventList from '../components/Event/EventList'

const EventContext = () => {
  return (
    <section id="events">
      <div className="events-header">
        <div className="event-status">
          <div className="event-status-item">
            <button className="btn btn-status">Active (2)</button>
            <button className="btn btn-status">Draft (10)</button>
            <button className="btn btn-status">Past (5)</button>
          </div>
        </div>
        <button className="btn btn-link">Add Event</button>
      </div>
      
      <EventList />
    </section>
  )
}

export default EventContext