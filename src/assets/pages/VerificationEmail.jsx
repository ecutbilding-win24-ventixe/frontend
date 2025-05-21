import React, { useState } from "react";
import Logo from "/images/Symbol.svg";
import { useNavigate } from "react-router-dom";
import { sendVerificationCode, verifyCode } from "../all_api/verificationapi";

const VerificationEmail = () => {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [formStep, setFormStep] = useState(1);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate()

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const result = await sendVerificationCode(email);
      if (result.success) {
        setFormStep(2);
        setSuccess(result.message);
      } else {
        setError(result.message);
      }
  };

const handleVerifyCode = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const result = await verifyCode(email, verificationCode);
    if (result.success) {
        setSuccess(result.message);
        navigate("/signup", { state: { email: email } });
    } else {
        setError(result.message);
    }
};

  return (
    <section id="signup">
      <div className="login-logo">
        <img src={Logo} alt="Logo" />
        <h1>Email Verification</h1>
      </div>

      {formStep === 1 && (
      <form onSubmit={handleEmailSubmit}>

        <div className="form-group">
          <label htmlFor="email">Email</label>
        <div className="field-group">
            <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            {error && <span className="error-message">{error}</span>}
            {success && <span className="success-message">{success}</span>}
          </div>
        </div>
        
        <button className="btn btn-submit">Continue</button>
      </form>
      )}

      {formStep === 2 && (
      <form onSubmit={handleVerifyCode}>
        <div className="form-group">
          <label htmlFor="verificationCode">Verification Code</label>
          <div className="field-group">
            <input type="text" id="verificationCode" name="verificationCode" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} required />
            {error && <span className="error-message">{error}</span>}
            {success && <span className="success-message">{success}</span>}
          </div>
        </div>
        <button className="btn btn-submit">Verify Code</button>
      </form>
      )}
    </section>
  );
};

export default VerificationEmail;
