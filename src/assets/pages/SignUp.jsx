import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "/images/Symbol.svg";

const SignUp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!location.state?.email) {
      navigate("/verification-email");
    } else {
      setEmail(location.state.email);
    }
  }, [location, navigate]);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        "https://ventixe-authservice-ghashdgqa7hyfwe2.swedencentral-01.azurewebsites.net/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: password,
            confirmPassword: confirmPassword,
            emailConfirmed: true,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to create account.");
        return;
      }
      navigate("/login");
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <section id="signup">
      <div className="login-logo">
        <img src={Logo} alt="Logo" />
        <h1>Create Account</h1>
      </div>

      <form className="signup-form" onSubmit={handleSignup}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <div className="field-group">
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              disabled
              readOnly
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="firstname">Firstname</label>
          <div className="field-group">
            <input
              type="firstname"
              id="firstname"
              name="firstname"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
        </div>

         <div className="form-group">
          <label htmlFor="lastName">Lastname</label>
          <div className="field-group">
            <input
              type="lastname"
              id="lastname"
              name="lastname"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className="field-group">
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className="field-group">
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        </div>
        {error && <p className="error-message">{error}</p>}
        <button className="btn btn-submit" type="submit">
          Create
        </button>
        <div className="form-footer">
          <span>Do you have an account?</span>
          <a href="/login" className="btn btn-secondary">
            Login
          </a>
        </div>
      </form>
    </section>
  );
};

export default SignUp;
