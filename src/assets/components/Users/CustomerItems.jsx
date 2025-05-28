import React from 'react'

const CustomerItems = ({ item }) => {
 const dateObj = new Date(item.createAt);
    const date = dateObj.toLocaleDateString('sv-SE');
    const time = dateObj.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
});


  
  return (
    <tr className="customer-items-row">
      <td>{item.firstName}</td>
      <td>{item.lastName}</td>
      <td>{item.email}</td>
      <td className="booking-item-date">
        <span className="booking-item-date-date">{date}</span>
        <span className="booking-item-time">{time}</span>
      </td>
    </tr>
  )
}

export default CustomerItems