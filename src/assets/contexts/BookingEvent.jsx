import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const BookingEvent = () => {
  const navigate  = useNavigate()
  const { id } = useParams()
  const [event, setEvent] = useState({})
  const [formData, setFormData] = useState({
  eventId: id,
  firstname: '',
  lastname: '',
  email: '',
  address: '',
  city: '',
  zip: '',
  phone: ''
})

  useEffect(() => {
        getEvent()
      }, [])
  
    const getEvent = async () => {
      try {
        const res = await fetch(`https://ventixe-eventservice-gbekgwdbadc7c4hz.swedencentral-01.azurewebsites.net/api/events/${id}`)
        if (!res.ok) throw new Error("Failed to fetch event")
        const data = await res.json()
        setEvent(data.result)
      }
      catch (error) {
        console.error("Error fetching event:", error)
      }
    }

      const handleChange = (e) => {
        const { name, value } = e.target
        setformData(prev => ({ ...prev, [name]: value }))
      }

      const handleSubmit = async (e) => {
        e.preventDefault()
        try {
          const res = await fetch(`https://ventixe-bookingservice-gbekgwdbadc7c4hz.swedencentral-01.azurewebsites.net/api/bookings`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify(formData)
        })
          if (!res.ok) {
            console.error("Booking failed:", res.statusText)
          } else {
            console.log("Booking successful")
            navigate(`/`)
          }
        }
        catch (error) {
          console.error("Error posting booking:", error)
        }
      }
  return (
    <div>
      <h1>Book Event - {event.title}</h1>
      <div>
        <form onSubmit={handleSubmit} noValidate>
          <div>
            <label htmlFor="name">First Name</label>
            <input type="text" id="firstname" name="firstname" value={formData.firstname} onChange={handleChange} required />

            <label htmlFor="name">Last Name</label>
            <input type="text" id="lastname" name="lastname" value={formData.lastname} onChange={handleChange} required />

            <label htmlFor="name">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />

            <label htmlFor="name">Address</label>
            <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required />

            <label htmlFor="name">City</label>
            <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} required />

            <label htmlFor="name">Zip Code</label>
            <input type="text" id="zip" name="zip" value={formData.zip} onChange={handleChange} required />

            <label htmlFor="name">Phone Number</label>
            <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />

            <button type="submit" className="btn btn-submit">Book Now</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default BookingEvent