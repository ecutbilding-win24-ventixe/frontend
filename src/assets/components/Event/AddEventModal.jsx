import React, { useState, useEffect } from 'react';

const AddEventModal = ({ onClose, onSubmit }) => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    eventDate: '',
    location: '',
    capacity: 100,
    categoryId: '',
    statusId: '',
    packages: [
      {
        packageTypeId: '',
        placement: '',
        price: 0,
        currency: 'USD'
      }
    ]
  });

  const [categories, setCategories] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [packageTypes, setPackageTypes] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handlePackageChange = (index, e) => {
    const { name, value } = e.target;
    const updatedPackages = [...form.packages];
    updatedPackages[index][name] = value;
    setForm(prev => ({ ...prev, packages: updatedPackages }));
  };

  const addPackage = () => {
    setForm(prev => ({
      ...prev,
      packages: [
        ...prev.packages,
        { packageTypeId: '', placement: '', price: 0, currency: 'USD' }
      ]
    }));
  };

  const removePackage = (index) => {
    const updatedPackages = form.packages.filter((_, i) => i !== index);
    setForm(prev => ({ ...prev, packages: updatedPackages }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(form);
    onClose();
  };
 
  const BASE_URL = "https://ventixe-eventservice-gbekgwdbadc7c4hz.swedencentral-01.azurewebsites.net/api/events";
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [categoryRes, statusRes, packageTypeRes] = await Promise.all([
          fetch(`${BASE_URL}/categories`),
          fetch(`${BASE_URL}/statuses`),
          fetch(`${BASE_URL}/packages`)
        ]);

       const [categoryJson, statusJson, packageTypeJson] = await Promise.all([
          categoryRes.json(),
          statusRes.json(),
          packageTypeRes.json()
        ]);

        setCategories(categoryJson.result || []);
        setStatuses(statusJson.result || []);
        setPackageTypes(packageTypeJson.result || []);

      } catch (error) {
        console.error("Error fetching dropdown data:", error);
      }
    };

    fetchInitialData();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div className="modal-add-event">
        <div className="modal-add-event-right">
          <div className="form-group">
            <label>Event Name</label>
            <input name="name" value={form.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Event Date</label>
            <input type="datetime-local" name="eventDate" value={form.eventDate} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Location</label>
            <input name="location" value={form.location} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Capacity</label>
            <input type="number" name="capacity" value={form.capacity} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select name="categoryId" value={form.categoryId} onChange={handleChange} required>
              <option value="">Select Category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Status</label>
            <select name="statusId" value={form.statusId} onChange={handleChange} required>
              <option value="">Select Status</option>
              {statuses.map(status => (
                <option key={status.id} value={status.id}>{status.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="modal-add-event-left">
          {form.packages.map((pkg, index) => (
            <div key={index} className="form-group">
              <label>Package Type</label>
              <select name="packageTypeId" value={pkg.packageTypeId} onChange={(e) => handlePackageChange(index, e)} required>
                <option value="">Select Package</option>
                {packageTypes.map(pt => (
                  <option key={pt.id} value={pt.id}>{pt.title}</option>
                ))}
              </select>

              <label>Placement</label>
              <input name="placement" value={pkg.placement} onChange={(e) => handlePackageChange(index, e)} />

              <label>Price</label>
              <input type="number" name="price" value={pkg.price} onChange={(e) => handlePackageChange(index, e)} required />

              <label>Currency</label>
              <input name="currency" value={pkg.currency} onChange={(e) => handlePackageChange(index, e)} />

              <div className="package-actions">
                <button type="button" className='btn btn-small' onClick={() => removePackage(index)}>Remove</button>
                {index === form.packages.length - 1 && (
                <button type="button" className='btn btn-small' onClick={addPackage}>+ Add Package</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="modal-footer">
        <button type="submit" className="btn btn-link">Create</button>
        <button type="button" className="btn btn-link" onClick={onClose}>Cancel</button>
      </div>
    </form>
  );
};

export default AddEventModal;
