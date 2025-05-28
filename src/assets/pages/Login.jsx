import React, { useState } from 'react'
import Logo from '/images/Symbol.svg'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate();
  const [email, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch("https://ventixe-authservice-ghashdgqa7hyfwe2.swedencentral-01.azurewebsites.net/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          Email: email,
          Password: password,
        }),
      });

      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        setError(data.message || "Failed to login.");
        return;
      }
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", data.email)
        localStorage.setItem("userId", data.userId);
      }
      navigate("/");
    } catch (error) {
      setError("Someting went wrong. Please try again.");
    }
   };
  
  return (
    <section id="login">
      <div className="login-logo">
        <img src={Logo} alt="Logo" />
        <h1>Login</h1>
      </div>


      <form className="login-form" onSubmit={handleLogin}>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <div className="field-group">
            <input type="email" id="email" name="email" value={email} onChange={(e) => setMail(e.target.value)} required />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="email">Password</label>
          <div className="field-group">
            <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
        </div>

        <div className="form-group">
          {error && <span className="error-message">{error}</span>}
        </div>

        <button className="btn btn-submit" type="submit">Login</button>

        <div className="form-footer">
          <span>Don't have an account?</span>
          <a href="/verification-email" className="btn btn-secondary">Register</a>
        </div>
      </form>
      
    </section>
  )
}

export default Login