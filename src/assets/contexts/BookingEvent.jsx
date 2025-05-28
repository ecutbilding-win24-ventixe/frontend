import React, { useState } from 'react'
import BookingList from '../components/Booking/BookingList'
import Modal from '../components/Modal/Modal'
import AddBookingModal from '../components/Booking/AddBookingModal';

const BookingEvent = () => {
  const [showModal, setShowModal] = useState(false);
  
    const handleAddBooking = async (formData) => {
      try {
        const response = await fetch("https://ventixe-bookingsservice-d5ethag0bycvh8da.swedencentral-01.azurewebsites.net/api/booking", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
  
        const result = await response.json();
        if (!response.ok) throw new Error(result.message || "Failed to create booking");
  
        alert("Booking created!");
        setShowModal(false);
        window.location.reload(); 
      } catch (err) {
        alert(err.message);
      }
    }

  return (
    <section className="bookings">
      <div className="booking-header">
        <div className="booking-status">
          <div className="booking-status-item">
            <button className="btn btn-status">Padding</button>
            <button className="btn btn-status">Confirmed</button>
            <button className="btn btn-status">Cancelled</button>
          </div>
        </div>
        <button className="btn btn-link" onClick={() => setShowModal(true)}>Add Booking</button>
      </div>
      <BookingList />
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add Booking">
        <AddBookingModal
          onClose={() => setShowModal(false)}
          onSubmit={handleAddBooking}
        />
      </Modal>
    </section>
  )
}

export default BookingEvent
