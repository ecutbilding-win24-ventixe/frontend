import React, { useEffect, useState } from 'react'

const Dashboard = () => {
  const [eventCount, setEventCount] = useState(0);
  const [bookingCount, setBookingCount] = useState(0);
  const [ticketsSold, setTicketsSold] = useState(0);

  useEffect(() => {
    const fetchEventCount = async () => {
      try {
        const response = await fetch("https://ventixe-eventservice-gbekgwdbadc7c4hz.swedencentral-01.azurewebsites.net/api/Events")
        if (response.ok) {
          const data = await response.json();
          const inProgressEvents = data.result.filter(event => event.status?.name === "In Progress");
          setEventCount(inProgressEvents.length);
        } else {
          console.error("Failed to fetch events");
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    }

const fetchBookingCount = async () => {
  try {
    const response = await fetch("https://ventixe-bookingsservice-d5ethag0bycvh8da.swedencentral-01.azurewebsites.net/api/Booking");
    if (response.ok) {
      const data = await response.json();
      const totalBookings = data.result.length;
      setBookingCount(totalBookings);

      const totalTickets = data.result.reduce((sum, b) => sum + b.quantity, 0);
      setTicketsSold(totalTickets);
    } else {
      console.error("Failed to fetch bookings");
    }
  } catch (error) {
    console.error("Error fetching bookings:", error);
  }
};

  
  
    fetchEventCount();
    fetchBookingCount();
  }, []);


  return (
    <div className="dashboard-statics">
      <div className="dashboard-card">
        <div className="dashboard-right">
          <div className="card-icon">
            <i class="fa-light fa-calendar"></i>
          </div>
        </div>
        <div className="dashboard-left">
          <div className="card-title">Upcoming Events</div>
          <div className="card-number">{eventCount}</div>
        </div>
      </div>

      <div className="dashboard-card">
        <div className="dashboard-right">
          <div className="card-icon">
            <i class="fa-light fa-square-check"></i>
          </div>
        </div>
        <div className="dashboard-left">
          <div className="card-title">Total Bookings</div>
          <div className="card-number">{bookingCount}</div>
        </div>
      </div>


      <div className="dashboard-card">
        <div className="dashboard-right">
          <div className="card-icon">
            <i className="fa-regular fa-ticket-simple"></i>
          </div>
        </div>
        <div className="dashboard-left">
          <div className="card-title">Tickets Sold</div>
          <div className="card-number">{ticketsSold}</div>
        </div>
      </div>

    </div>
  )
}

export default Dashboard