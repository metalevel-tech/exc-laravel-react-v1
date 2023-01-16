import React from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  const onSubmit = (ev) => {
    ev.preventDefault();
  };

  return (
    // The layout tags (first 2 <div>) can be moved
    // to the <GuestLayout> component, but we will lost
    // the animation: https://youtu.be/qJq9ZMB2Was?t=3464
    // We can create a state in the <GuestLayout> component,
    // and pass it to the <Login> and <Signup> components,
    // where it will be changed to trigger rendering of the
    // parent and the animation will be triggered too.
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
