import React from "react";
import Logo from "/images/Symbol.svg";

const SignUp = () => {
  return (
    <section id="signup">
      <div className="login-logo">
        <img src={Logo} alt="Logo" />
        <h1>Register</h1>
      </div>

      <form>

         <div className="form-group">
          <label htmlFor="firstname">First Name</label>
          <div className="field-group">
            <input type="text" id="firstname" name="firstname" required />
            <span className="validation"></span>
          </div>
        </div>

         <div className="form-group">
          <label htmlFor="lastname">Last Name</label>
          <div className="field-group">
            <input type="text" id="lastname" name="lastname" required />
            <span className="validation"></span>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <div className="field-group">
            <input type="email" id="email" name="email" required />
            <span className="validation"></span>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className="field-group">
            <input type="password" id="password" name="password" required />
            <span className="validation"></span>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="confirmpassword">Confirm Password</label>
          <div className="field-group">
            <input type="password" id="confirmpassword" name="confirmpassword" required />
            <span className="validation"></span>
          </div>
        </div>

        <button className="btn btn-submit">Save</button>
      </form>
    </section>
  );
};

export default SignUp;
