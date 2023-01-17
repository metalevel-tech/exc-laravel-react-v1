import React, { useRef } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Signup() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();

  const { setUser, setToken } = useStateContext();

  const onSubmit = (ev) => {
    ev.preventDefault();

    // PasswordConfirmation need to be password_confirmation,
    // because how Laravel will be searched for the password conformation...
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value
    };

    // console.log(payload);

    axiosClient
      .post("/signup", payload)
      .then((response) => {
        // We can destructure the response object within
        // the function parameters part...
        // `data` is the actual server's response.
        // `status` is the status of the response, we can
        // use it like: if (status !== 200) throw someError;
        const { data, status } = response;

        // Once the user and token are set tha application will be RERENDER
        // and the User will be immediately redirected to the /dashboard page,
        // the re is no need to do any explicit redirect.
        setUser(data.user);
        setToken(data.token);
      })
      .catch((error) => {
        // This is the actual response of the server.
        const response = error.response;

        /**
         * HTTP 422 Validation error:
         * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/422
         */
        if (response && response.status === 422) {
          // `data` is the actual server's response.
          console.log(response.data.errors);
          // TODO: we need a state that will display the errors to the User.
        }
      });
  };

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Create an account</h1>
          <input
            ref={nameRef}
            name="name"
            id="name"
            placeholder="Your Full Name"
          />
          <input
            ref={emailRef}
            type="email"
            name="email"
            id="email"
            placeholder="Email Address"
          />
          <input
            ref={passwordRef}
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />
          <input
            ref={passwordConfirmationRef}
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
