import React, { useEffect, useState } from "react";

const EditEventModal = ({ eventData, onSubmit, onClose }) => {
  const [form, setForm] = useState({
    id: "",
    name: "",
    description: "",
    eventDate: "",
    location: "",
    capacity: 100,
    categoryId: "",
    statusId: "",
    imageUrl: "",
    packages: [],
  });

  const [categories, setCategories] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [packageTypes, setPackageTypes] = useState([]);

  useEffect(() => {
    if (eventData) {
      setForm({
        id: eventData.id,
        name: eventData.name,
        description: eventData.description,
        eventDate: eventData.eventDate ? eventData.eventDate.slice(0, 16) : "",
        location: eventData.location,
        capacity: eventData.capacity,
        imageUrl: eventData.imageUrl || "",
        categoryId: eventData.category?.id || "",
        statusId: eventData.status?.id || "",
        packages: (eventData.packages || []).map((pkg) => ({
          packageTypeId: pkg.id || "",
          placement: pkg.placement,
          price: pkg.price,
          currency: pkg.currency,
        })),
      });
    }
  }, [eventData]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [categoryRes, statusRes, packageTypeRes] = await Promise.all([
          fetch(
            `https://ventixe-eventservice-gbekgwdbadc7c4hz.swedencentral-01.azurewebsites.net/api/events/categories`
          ),
          fetch(
            `https://ventixe-eventservice-gbekgwdbadc7c4hz.swedencentral-01.azurewebsites.net/api/events/statuses`
          ),
          fetch(
            `https://ventixe-eventservice-gbekgwdbadc7c4hz.swedencentral-01.azurewebsites.net/api/events/packages`
          ),
        ]);

        const [categoryJson, statusJson, packageTypeJson] = await Promise.all([
          categoryRes.json(),
          statusRes.json(),
          packageTypeRes.json(),
        ]);

        setCategories(categoryJson.result || []);
        setStatuses(statusJson.result || []);
        setPackageTypes(packageTypeJson.result || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchInitialData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePackageChange = (index, e) => {
    const { name, value } = e.target;
    const updatedPackages = [...form.packages];
    updatedPackages[index][name] = value;
    setForm((prev) => ({ ...prev, packages: updatedPackages }));
  };

  const addPackage = () => {
    setForm((prev) => ({
      ...prev,
      packages: [
        ...prev.packages,
        { packageTypeId: "", placement: "", price: 0, currency: "USD" },
      ],
    }));
  };

  const removePackage = (index) => {
    const updatedPackages = form.packages.filter((_, i) => i !== index);
    setForm((prev) => ({ ...prev, packages: updatedPackages }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://ventixe-eventservice-gbekgwdbadc7c4hz.swedencentral-01.azurewebsites.net/api/events/update/${form.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Update successful:", data);
        if (typeof onSubmit === "function") onSubmit(form);
        if (typeof onClose === "function") onClose();
      } else {
        console.error("Update failed:", data.message || "Unknown error");
      }
    } catch (error) {
      console.error("Network or server error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="modal-add-event">
        <div className="modal-add-event-right">
          <div className="form-group">
            <label>Event Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Event Date</label>
            <input
              type="datetime-local"
              name="eventDate"
              value={form.eventDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Location</label>
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Capacity</label>
            <input
              type="number"
              name="capacity"
              value={form.capacity}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select
              name="categoryId"
              value={form.categoryId}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Status</label>
            <select
              name="statusId"
              value={form.statusId}
              onChange={handleChange}
              required
            >
              <option value="">Select Status</option>
              {statuses.map((status) => (
                <option key={status.id} value={status.id}>
                  {status.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="modal-add-event-left">
          {form.packages.map((pkg, index) => (
            <div key={index} className="form-group">
              <label>Package Type</label>
              <select
                name="packageTypeId"
                value={String(pkg.packageTypeId)}
                onChange={(e) => handlePackageChange(index, e)}
                required
              >
                <option value="">Select Package</option>
                {packageTypes.map((pt) => (
                  <option key={pt.id} value={pt.id}>
                    {pt.title}
                  </option>
                ))}
              </select>

              <label>Placement</label>
              <input
                name="placement"
                value={pkg.placement}
                onChange={(e) => handlePackageChange(index, e)}
              />

              <label>Price</label>
              <input
                type="number"
                name="price"
                value={pkg.price}
                onChange={(e) => handlePackageChange(index, e)}
                required
              />

              <label>Currency</label>
              <input
                name="currency"
                value={pkg.currency}
                onChange={(e) => handlePackageChange(index, e)}
              />

              <div className="package-actions">
                <button
                  type="button"
                  className="btn btn-small"
                  onClick={() => removePackage(index)}
                >
                  Remove
                </button>
                {index === form.packages.length - 1 && (
                  <button
                    type="button"
                    className="btn btn-small"
                    onClick={addPackage}
                  >
                    + Add Package
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="modal-footer">
        <button type="submit" className="btn btn-link">
          Update
        </button>
        <button type="button" className="btn btn-link" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditEventModal;
