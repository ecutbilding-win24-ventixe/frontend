import React, { useState, useEffect, useRef } from "react";
import { getUserInfo } from "../../js/login-auth.js";

const Account = () => {
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
                <span>{user.email}</span>
              </div>
            </div>

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
