import React, { useState, useEffect, useRef } from "react";
import { getUserInfo } from "../../js/login-auth.js";
import Modal from "../Modal/Modal.jsx";
import AccountSettings from "../Account/AccountSettings.jsx";

const Account = () => {
  const userId = localStorage.getItem("userId");
   const [profile, setProfile] = useState({
      firstName: "",
      lastName: "",
   });
  const [showSettings, setShowSettings] = useState(false);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const user = getUserInfo();

  const toggleDropdown = () => setOpen(!open);

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`https://ventixe-accountserviceprofile-exdnhxd3d0hkfcbj.swedencentral-01.azurewebsites.net/api/AccountProfileService/get-profile/${userId}`);
        const data = await response.json();
        
        if (response.ok && data.result) {
          const p = data.result;
          setProfile({
            firstName: p.firstName || "",
            lastName: p.lastName || "",
          });
        } else {
          console.error("Failed to fetch profile", data);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, [userId]);

  if (!user) return null;

  return (
    <div id="account-container" ref={dropdownRef}>
      <button type="button" className="btn-account" onClick={toggleDropdown}>
        <img src="/images/user-logo.png" alt="Login user image" />
      </button>

      {open && (
        <div className="dropdown dropdown-show">
          <div className="account-dropdown">
            <div className="dropdown-header">
              <div className="account-name">
                <img src="/images/user-logo.png" alt="Login user" />
                <div className="account-name-detail">
                  <span className="account-fullname">{profile.firstName} {profile.lastName}</span>
                  <span className="account-email">{user.email}</span>
                </div>
              </div>
            </div>

            <div className="dropdown-body">
              <div className="dropdown-item" onClick={() => setShowSettings(true)}>
                <i className="fa-solid fa-gear"></i>
                <span className="account-settings">Settings</span>
              </div>
              {showSettings && (
                <Modal
                  isOpen={showSettings}
                  onClose={() => setShowSettings(false)}
                  title="Edit Account"
                >
                  <AccountSettings user={user} onClose={() => setShowSettings(false)} />
                </Modal>
              )}
            </div>

            <div className="divider"></div>

            <nav className="dropdown-actions">
              <button
                className="dropdown-action"
                onClick={() => {
                  localStorage.clear();
                  window.location.href = "/login";
                }}
              >
                <i className="fa-solid fa-right-from-bracket"></i>
                <span>Sign out</span>
              </button>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
