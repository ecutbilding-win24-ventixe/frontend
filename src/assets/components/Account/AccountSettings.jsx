import React, { useEffect, useState } from "react";

const AccountSettings = ({ onClose }) => {
  const userId = localStorage.getItem("userId");

  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    streetName: "",
    streetNumber: "",
    city: "",
    postalCode: "",
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(
          `https://ventixe-accountserviceprofile-exdnhxd3d0hkfcbj.swedencentral-01.azurewebsites.net/api/AccountProfileService/get-profile/${userId}`
        );
        const data = await res.json();

        if (res.ok && data.result) {
          const p = data.result;

          setProfile({
            firstName: p.firstName || "",
            lastName: p.lastName || "",
            streetName: p.addressInfo?.streetName || "",
            streetNumber: p.addressInfo?.streetNumber || "",
            city: p.addressInfo?.city || "",
            postalCode: p.addressInfo?.postalCode || "",
          });
        }
      } catch (error) {
        console.error("Failed to fetch profile", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

  const payload = {
    userId: userId,
    firstName: profile.firstName,
    lastName: profile.lastName,
    streetName: profile.streetName,
    streetNumber: profile.streetNumber,
    postalCode: profile.postalCode,
    city: profile.city,
    addressTypeId: 1
  };

    try {
      const res = await fetch(
        `https://ventixe-accountserviceprofile-exdnhxd3d0hkfcbj.swedencentral-01.azurewebsites.net/api/AccountProfileService/update/${userId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      console.log("Response status:", res.status);
      console.log(payload);
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        setMessage(errorData.message || "Update failed");
        return;
      }
      if (res.ok) {
        setMessage("Updated successfully!");
        window.location.reload("/"); 
      } else {
        const errorData = await res.json();
        setMessage(errorData.message || "Update failed");
      }
    } catch (err) {
      setMessage("Update error");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit} className="account-settings-form">
      <div className="form-group">
        <label>First Name</label>
        <input name="firstName" value={profile.firstName} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Last Name</label>
        <input name="lastName" value={profile.lastName} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>StreetName</label>
        <input name="streetName" value={profile.streetName} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>StreetNumber</label>
        <input name="streetNumber" value={profile.streetNumber} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>City</label>
        <input name="city" value={profile.city} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Postal Code</label>
        <input name="postalCode" value={profile.postalCode} onChange={handleChange} />
      </div>

      {message && <p className="form-message">{message}</p>}

      <div className="form-actions booking-item-actions">
        <button type="submit" className="btn btn-link">Update</button>
        <button type="button" className="btn btn-link" onClick={onClose}>Cancel</button>
      </div>
    </form>
  );
};

export default AccountSettings;
