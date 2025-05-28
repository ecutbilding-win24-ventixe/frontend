import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Modal from '../Modal/Modal'
import EditEventModal from './EditEventModal'


const EventDetails = () => {
  const {id} = useParams()

  const [event, setEvent] = useState({})
   const [showEditModal, setShowEditModal] = useState(false); 

  const getEvents = async () => {
      const response = await fetch(`https://ventixe-eventservice-gbekgwdbadc7c4hz.swedencentral-01.azurewebsites.net/api/events/${id}`)
      if (response.ok) {
        const data = await response.json()
        console.log(data)
        setEvent(data.result)
      }
    }
    useEffect(() => {
      getEvents()
    }, [])

    const handleUpdate = async (updatedData) => {
    const res = await fetch(`https://ventixe-eventservice-gbekgwdbadc7c4hz.swedencentral-01.azurewebsites.net/api/events/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedData)
    });

    if (res.ok) {
      await getEvents();
      setShowEditModal(false);
    }
  };

const handleDelete = async () => {
  const confirmDelete = window.confirm("Are you sure you want to delete this event?");
  if (!confirmDelete) return;

  try {
    const response = await fetch(`https://ventixe-eventservice-gbekgwdbadc7c4hz.swedencentral-01.azurewebsites.net/api/events/delete/${id}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      alert("Event deleted successfully.");
      window.location.href = "/events"; 
    } else {
      const data = await response.json();
      alert(`Failed to delete: ${data.message || "Unknown error"}`);
    }
  } catch (error) {
    console.error("Error deleting event:", error);
    alert("Network error. Please try again.");
  }
};


  return (
    <div className="event-details">
      <div className="event-detail">
        <div className="event-detail-image">
          <img  />
        </div>
        <div className="event-detail-header">
          <h1>{event.name}</h1>
          <p>{event.status?.name}</p>
        </div>
        <div className="event-detail-body">
          <div className="event-detail-body-right">
            {/*Chatgpt forever :)) */}
            <p className="event-detail-body-date"><i className="fa-light fa-calendar"></i> {new Date(event.eventDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })} - {new Date(event.eventDate).toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
              })}
          </p>
            <p className="event-detail-body-location"><i className="fa-regular fa-location-dot"></i> {event.location}</p>
          </div>

          <div className="event-detail-body-middle">
            <p>Total tickets</p>
            <p className="event-detail-body-capacity">{event.capacity}</p>
          </div>
          
          <div className="event-detail-body-left">
            <p>Starts tickets</p>
            <p className="event-detail-body-packages">${event.packages?.[1]?.price}</p>
          </div>

        </div>
        <div className="divider"></div>
        <div className="event-detail-footer">
          <h3>About Event</h3>
          <p className="about-event">{event.description}</p>
        </div>

      </div>

      <div className="event-packages">
        <h2>Packages</h2>
        {event.packages && event.packages.map((pack, index) => (
          <div className="package" key={pack.id || index}>
            <div className="package-details">
              <p className="package-details-title">{pack.title}</p>
              <div className='package-details-info'>
                <p className="package-details-seat"><i className="fa-light fa-circle-check"></i> {pack.seatingArragement}</p>
                <p className="package-details-seat"><i className="fa-light fa-circle-check"></i> {event.category?.name}</p>
              </div>
            </div>
            <div className="package-details-price">
              <p>${pack.price}</p>
            </div>
            
          </div>
        ))}
      </div>


      <div className="event-details-actions">        
        <Link className="btn-ticket" to={`/events/booking/${id}`}>Buy Ticket</Link>

      <button  onClick={() => setShowEditModal(true)} className="btn-edit">
        Edit
      </button>

      <button   className="btn-edit" onClick={handleDelete}>
        Delete
      </button>
      </div>


      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)} title="Edit Event">
        <EditEventModal eventData={event} onSubmit={handleUpdate} />
      </Modal>


    </div>
  )
}

export default EventDetails