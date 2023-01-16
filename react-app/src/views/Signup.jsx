import React from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  const onSubmit = (ev) => {
    ev.preventDefault();
  };

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Create an account</h1>
          <input name="name" id="name" placeholder="Full Name" />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email Address"
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />
          <input
            type="password"
            name="password"
            id="password-confirm"
            placeholder="Password Confirmation"
          />
          <input type="submit" value="Login" className="btn btn-block" />
          <p className="message">
            Already Registered? <Link to="/login">Sign in!</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
