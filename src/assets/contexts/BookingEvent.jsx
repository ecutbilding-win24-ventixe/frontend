import React, { useState } from 'react';
import BookingList from '../components/Booking/BookingList';
import Modal from '../components/Modal/Modal';
import AddBookingModal from '../components/Booking/AddBookingModal';

const BookingEvent = () => {
  const [showModal, setShowModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState(null);

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
  };

  return (
    <section className="bookings">
      <div className="booking-header">
        <div className="booking-status">
          <div className="booking-status-item">
            <button className={`btn btn-status ${filterStatus === null ? 'active' : ''}`} onClick={() => setFilterStatus(null)}>All</button>
            <button className={`btn btn-status ${filterStatus === 1 ? 'active' : ''}`} onClick={() => setFilterStatus(1)}>Pending</button>
            <button className={`btn btn-status ${filterStatus === 2 ? 'active' : ''}`} onClick={() => setFilterStatus(2)}>Confirmed</button>
            <button className={`btn btn-status ${filterStatus === 3 ? 'active' : ''}`} onClick={() => setFilterStatus(3)}>Cancelled</button>
          </div>
        </div>
        <button className="btn btn-link" onClick={() => setShowModal(true)}>Add Booking</button>
      </div>

      <BookingList filterStatus={filterStatus} />

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add Booking">
        <AddBookingModal
          onClose={() => setShowModal(false)}
          onSubmit={handleAddBooking}
        />
      </Modal>
    </section>
  );
};

export default BookingEvent;
