import React, { useState } from 'react';
import EventList from '../components/Event/EventList';
import Modal from '../components/Modal/Modal';
import AddEventModal from '../components/Event/AddEventModal';

const EventContext = () => {
  const [showModal, setShowModal] = useState(false);

  const handleAddEvent = async (formData) => {
    try {
      const response = await fetch("https://ventixe-eventservice-gbekgwdbadc7c4hz.swedencentral-01.azurewebsites.net/api/events", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Failed to create event");

      alert("Event created!");
      setShowModal(false);
      window.location.reload(); 
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <section id="events">
      <div className="events-header">
        <div className="event-status">
          <div className="event-status-item">
            <button className="btn btn-status">Active</button>
            <button className="btn btn-status">Draft</button>
            <button className="btn btn-status">Past</button>
          </div>
        </div>
        <button className="btn btn-link" onClick={() => setShowModal(true)}>Add Event</button>
      </div>

      <EventList />

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add Event">
        <AddEventModal
          onClose={() => setShowModal(false)}
          onSubmit={handleAddEvent}
        />
      </Modal>
    </section>
  );
};

export default EventContext;
