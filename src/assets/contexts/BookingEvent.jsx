import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const BookingEvent = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  // Form state
  const [formData, setFormData] = useState({
    EventId: id,
    FirstName: '',
    LastName: '',
    Email: '',
    StreetName: '',
    PostalCode: '',
    City: '',
    TicketQuantity: 1
  })

  // Event state
  const [event, setEvent] = useState({})

  // Fetch Event Details
  useEffect(() => {
    const getEvent = async () => {
      try {
        const res = await fetch(`https://ventixe-eventservice-gbekgwdbadc7c4hz.swedencentral-01.azurewebsites.net/api/events/${id}`)
        if (!res.ok) throw new Error("Failed to fetch event")
        const data = await res.json()
        setEvent(data)
      }
      catch (error) {
        console.error("Error fetching event:", error)
      }
    }

    if (id) {
      setFormData(prev => ({ ...prev, EventId: id }))
      getEvent()
    }
  }, [id])

  // Handle Form Changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch(`https://bookingservice-dzaudad5cgbrdycs.swedencentral-01.azurewebsites.net/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (!res.ok) {
        const errorData = await res.json()
        console.error("Booking failed:", errorData)
      } else {
        console.log("Booking successful")
        navigate(`/events`)
      }
    } catch (error) {
      console.error("Error posting booking:", error)
    }
  }

  return (
    <div>
      <h1>Book Event - {event.title}</h1>
      <div>
        <form onSubmit={handleSubmit} noValidate>
          <div>
            <label htmlFor="FirstName">First Name</label>
            <input type="text" id="FirstName" name="FirstName" value={formData.FirstName} onChange={handleChange} required />

            <label htmlFor="LastName">Last Name</label>
            <input type="text" id="LastName" name="LastName" value={formData.LastName} onChange={handleChange} required />

            <label htmlFor="Email">Email</label>
            <input type="email" id="Email" name="Email" value={formData.Email} onChange={handleChange} required />

            <label htmlFor="StreetName">Street Name</label>
            <input type="text" id="StreetName" name="StreetName" value={formData.StreetName} onChange={handleChange} required />

            <label htmlFor="PostalCode">Postal Code</label>
            <input type="text" id="PostalCode" name="PostalCode" value={formData.PostalCode} onChange={handleChange} required />

            <label htmlFor="City">City</label>
            <input type="text" id="City" name="City" value={formData.City} onChange={handleChange} required />

            <label htmlFor="TicketQuantity">Ticket Quantity</label>
            <input type="number" id="TicketQuantity" name="TicketQuantity" value={formData.TicketQuantity} onChange={handleChange} required min="1" />

            <button type="submit" className="btn btn-submit">Book Now</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default BookingEvent
