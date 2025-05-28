import React, { useEffect, useState } from 'react'
import CustomerItems from './CustomerItems'

const CustomersList = () => {
  const [customers, setCustomers] = useState([])
  const getCustomers = async () => {
    const response = await fetch("https://ventixe-bookingsservice-d5ethag0bycvh8da.swedencentral-01.azurewebsites.net/api/Booking")
    if (response.ok) {
      const data = await response.json()
      setCustomers(data.result)
      console.log(data.result)
    }
  }
  useEffect(() => {
    getCustomers()
  }, [])
  
  return (
    <table className="customers-list-table">
      <thead className="customers-list-header">
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>CreateAt</th>
        </tr>
      </thead>
      <tbody className="customers-list-body">
        {customers.map(customer => {
          return <CustomerItems item={customer} key={customer.id} />;
        })}
      </tbody>
    </table>
  )
}

export default CustomersList