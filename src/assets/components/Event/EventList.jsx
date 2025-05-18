import React, { useEffect, useState } from 'react'
import EventItem from './EventItem'

const EventList = () => {
  const [events, setEvents] = useState([])

  const getEvents = async () => {
    const response = await fetch("https://ventixe-eventservice-gbekgwdbadc7c4hz.swedencentral-01.azurewebsites.net/api/events")
    if (response.ok) {
      const data = await response.json()
      setEvents(data.result)
    }
  }

  useEffect(() => {
    getEvents()
  }, [])

  return (
    <div className="event-list">
      {
        events.map(event => (<EventItem item={event} key={event.id} />))
      }
    </div>
  )
}

export default EventList