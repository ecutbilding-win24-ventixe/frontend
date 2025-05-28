import React, { useEffect, useState } from 'react'
import Modal from '../Modal/Modal';
import EditBookingModal from './EditBookingModal';

const BookingItem = ({ item }) => {
    const dateObj = new Date(item.createAt);
    const date = dateObj.toLocaleDateString('sv-SE');
    const time = dateObj.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
});
const [showEditModal, setShowEditModal] = useState(false); 
  const [eventData, setEventData] = useState(null);
useEffect(() => {
  const fetchEventData = async () => {
    const res = await fetch(`https://ventixe-eventservice-gbekgwdbadc7c4hz.swedencentral-01.azurewebsites.net/api/events/${item.eventId}`);
    const data = await res.json();
    setEventData(data.result);
  };
  fetchEventData();
}, [item.eventId]);

if (!eventData) return <tr><td>Loading...</td></tr>;
const packageInfo = eventData.packages.find(p => p.id === item.packageTypeId);

const bookingStatusMap = {
  1: 'Pending',
  2: 'Confirmed',
  3: 'Cancelled',
};

//Update booking..........
const handleUpdate = async (updatedData) => { 
const res = await fetch(`https://ventixe-bookingsservice-d5ethag0bycvh8da.swedencentral-01.azurewebsites.net/api/booking/${item.id}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(updatedData)
});

if (res.ok) {
  window.location.reload(); 
  setShowEditModal(false);
  }
};

// Delete booking........
const handleDelete = async () => {
  const confirmDelete = window.confirm("Are you sure you want to delete this booking?");
  if (!confirmDelete) return;

  try {
    const response = await fetch(
      `https://ventixe-bookingsservice-d5ethag0bycvh8da.swedencentral-01.azurewebsites.net/api/booking/${item.id}`,
      { method: 'DELETE' }
    );

    if (response.status === 204 || response.ok) {
      alert("Booking deleted successfully.");
      window.location.reload();
    } else {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        alert(`Failed to delete booking: ${data.message || "Unknown error"}`);
      } else {
        alert("Failed to delete booking: No detailed error message received.");
      }
    }
  } catch (error) {
    console.error("Error deleting booking:", error);
    alert("Network error. Please try again.");
  }
};
  return (
    <tr className="booking-items-row">
      <td className="booking-item-date">
        <span className="booking-item-date-date">{date}</span>
        <span className="booking-item-time">{time}</span>
      </td>
      <td>{item.firstName} {item.lastName}</td>
      <td className="booking-item-event">
        <span className="booking-item-event-name">{eventData.name}</span>
        <span className="booking-item-event-category">{eventData.category?.name}</span>
      </td>
      <td>
        <span className="booking-item-package">{packageInfo?.title || 'N/A'}</span>
      </td>
      <td>${packageInfo?.price || 0}</td>
      <td>{item.quantity}</td>
      <td>${(packageInfo?.price || 0) * item.quantity}</td>
      <td>
        <span className="booking-item-status">
          {bookingStatusMap[item.bookingStatusId]}
        </span>
      </td>
      <td>
        <div className="booking-item-actions">
          <button className="item-actions-btn" onClick={handleDelete} ><i className="fa-regular fa-trash-xmark"></i></button>
          <button className="item-actions-btn" onClick={() => setShowEditModal(true)}><i className="fa-regular fa-pen-to-square"></i></button>
        </div>
        <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)} title="Update Booking">
          <EditBookingModal item={item} onClose={() => setShowEditModal(false)} onSubmit={handleUpdate}/>
        </Modal>
      </td>
    </tr>

  )
}

export default BookingItem