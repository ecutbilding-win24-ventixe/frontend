import React from 'react'
import Logo from '/images/Symbol.svg'

const Login = () => {
  return (
    <section id="login">
      <div className="login-logo">
        <img src={Logo} alt="Logo" />
        <h1>Login</h1>
      </div>


      <form>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <div className="field-group">
            <input type="email" id="email" name="email" required />
            <span className="validation"></span>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="email">Password</label>
          <div className="field-group">
            <input type="password" id="password" name="password" required />
            <span className="validation"></span>
          </div>
        </div>

        <button className="btn btn-submit">Login</button>
      </form>
      
    </section>
  )
}

export default Login