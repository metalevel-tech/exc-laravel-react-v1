import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Signup() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();

  const [errors, setErrors] = useState(null);
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

    setErrors(null);

    axiosClient
      .post("/signup", payload)
      .then((response) => {
        // We can destructure the response object within the function parameters part...
        // ... see Login.jsx for example
        // `data` is the actual server's response. `status` is the status of the response,
        // we can use it in this way: if (status !== 200) throw new Error("Some error");

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
         * `data` is the actual server's response.
         * It is be is Object where the properties cold be arrays, ot there could be single
         * property named 'massage' (created by us in AuthController::login()) which is string,
         * in this case we want to have the same format.. The errors are displayed under <h1> below.
         */
        if (response && response.status >= 400) {
          if (response.data.errors) {
            setErrors(response.data.errors);
          } else {
            setErrors({ message: [response.data.message] });
          }
        }
        console.log(response.data);
      });
  };

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Create an account</h1>

          {errors && (
            <div className="alert">
              {Object.keys(errors).map((key) => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </div>
          )}

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
          <input
            type="submit"
            value="Create an account"
            className="btn btn-block"
          />
          <p className="message">
            Already Registered? <Link to="/login">Sign in!</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
