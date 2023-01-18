import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const [errors, setErrors] = useState(null);
  const { setUser, setToken } = useStateContext();

  const onSubmit = (ev) => {
    ev.preventDefault();

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value
    };

    setErrors(null);

    axiosClient
      .post("/login", payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
      })
      .catch((error) => {
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
          <h1 className="title">Login into your account</h1>

          {errors && (
            <div className="alert">
              {Object.keys(errors).map((key) => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </div>
          )}

          <input
            ref={emailRef}
            type="email"
            name="email"
            id="email"
            placeholder="Email"
          />
          <input
            ref={passwordRef}
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />
          <input type="submit" value="Login" className="btn btn-block" />
          <p className="message">
            Not Registered? <Link to="/signup">Create an account!</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
