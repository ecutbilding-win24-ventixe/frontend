import React, { useState } from 'react'
import BookingItem from './BookingItem'

const BookingList = () => {
  const [bookings, setBookings] = useState([])

  const getBookings = async () => {
    const response = await fetch("https://ventixe-bookingsservice-d5ethag0bycvh8da.swedencentral-01.azurewebsites.net/api/booking")
    if (response.ok) {
      const data = await response.json()
      setBookings(data.result)
    }
  }
  useState(() => {
    getBookings()
  }, [])


  return (
<table className="booking-list-table">
  <thead className="booking-list-header">
    <tr>
      <th>Date</th>
      <th>Name</th>
      <th>Event</th>
      <th>Ticket Category</th>
      <th>Price</th>
      <th>Qty</th>
      <th>Amount</th>
      <th>Status</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {bookings.map(booking => (
      <BookingItem item={booking} key={booking.id} />
    ))}
  </tbody>
</table>
  )
}

export default BookingList