import React, { useEffect, useState } from "react";

const EditBookingModal = ({ item, onClose, onSubmit }) => {
  if (!item) return <div>Loading...</div>;

  const [form, setForm] = useState({ ...item });
  const [eventDetail, setEventDetail] = useState(null);

  useEffect(() => {
    const fetchEventDetail = async () => {
      try {
        const res = await fetch(`https://ventixe-eventservice-gbekgwdbadc7c4hz.swedencentral-01.azurewebsites.net/api/events/${item.eventId}/booking-details`);
        const data = await res.json();
        setEventDetail(data.result);
      } catch (error) {
        console.error("Failed to fetch event details", error);
      }
    };
    fetchEventDetail();
  }, [item.eventId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "packageTypeId") {
      const selectedPackage = eventDetail.packages.find(pkg => pkg.packageTypeId === value);
      setForm(prev => ({
        ...prev,
        packageTypeId: value,
        eventPriceId: selectedPackage?.eventPriceId || ""
      }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  const selectedPackage = eventDetail?.packages?.find(
    pkg => pkg.eventPriceId === form.eventPriceId
  );
  const totalPrice = selectedPackage ? selectedPackage.price * form.quantity : 0;

  return (
    <form onSubmit={handleSubmit} className="booking-form">
      <div className="form-group">
        <div>
          <label>First Name</label>
          <input type="text" name="firstName" value={form.firstName} onChange={handleChange} required />
        </div>
        <div>
          <label>Last Name</label>
          <input type="text" name="lastName" value={form.lastName} onChange={handleChange} required />
        </div>
      </div>

      <div className="form-group">
        <label>Email</label>
        <input type="email" name="email" value={form.email} onChange={handleChange} required />
      </div>

      {eventDetail?.packages?.length > 0 && (
        <>
          <div className="form-group">
            <label>Ticket Category</label>
            <select name="packageTypeId" value={form.packageTypeId} onChange={handleChange} required>
              <option value="">Select package</option>
              {eventDetail.packages.map(pkg => (
                <option key={pkg.eventPriceId} value={pkg.packageTypeId}>
                  {pkg.name}
                </option>
              ))}
            </select>
          </div>

          {form.eventPriceId && (
            <div className="form-group ticket-price">
              <label>Ticket Price</label>
              <p>
                ${selectedPackage?.price} {selectedPackage?.currency}
              </p>
              <label>Total Price</label>
              <p>{selectedPackage ? `$${totalPrice} ${selectedPackage.currency}` : "—"}</p>
            </div>
          )}
        </>
      )}

      <div className="form-group">
        <label>Quantity</label>
        <input
          type="number"
          name="quantity"
          value={form.quantity}
          onChange={handleChange}
          min="1"
          required
        />
      </div>

      <div className="form-group">
        <button type="submit" className="btn btn-link">Update Booking</button>
        <button type="button" onClick={onClose} className="btn btn-link">Cancel</button>
      </div>
    </form>
  );
};

export default EditBookingModal;
