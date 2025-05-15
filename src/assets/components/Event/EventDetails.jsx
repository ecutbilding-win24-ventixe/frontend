import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const EventDetails = () => {
  const {id} = useParams()

  const [event, setEvent] = useState({})

  const getEvents = async () => {
      const response = await fetch(`https://ventixe-eventservice-gbekgwdbadc7c4hz.swedencentral-01.azurewebsites.net/api/Events/${id}/`)
      if (response.ok) {
        const data = await response.json()
        setEvent(data.result)
      }
    }
    useEffect(() => {
      getEvents()
    }, [])

  return (
    <div className="event-details">
      <h1>{event.title}</h1>
      <p>{event.description}</p>
      <p>{event.eventDate}</p>
      <p>{event.location}</p>

      <Link to={`/events/booking/${id}`}>Buy Ticket</Link>

    </div>
  )
}

export default EventDetails