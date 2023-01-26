import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function UserForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(false);
  const { setNotification } = useStateContext();
  const [user, setUser] = useState({
    id: null,
    email: "",
    name: "",
    password: "",
    password_confirmation: ""
  });

  // If the 'id' is available we are trying to modify an existing user.
  // Otherwise (when it is not available) we are creating a new one.
  if (id) {
    useEffect(() => {
      setLoading(true);

      axiosClient
        .get(`/users/${id}`)
        .then(({ data }) => {
          // console.log(data);
          // See: laravel-app/app/Http/Resources/UserResource.php#10
          setUser(data);

          // Otherwise I can't see anything :)
          setTimeout(() => {
            setLoading(false);
          }, 250);
        })
        .catch(() => {
          setLoading(false);
        });
    }, []);
  }

  const catchTheUserFormValidationErrors = (error) => {
    const response = error.response;

    if (response && response.status >= 400) {
      if (response.data.errors) {
        setErrors(response.data.errors);
      } else {
        setErrors({ message: [response.data.message] });
      }
    }
  };

  const onSubmit = (ev) => {
    ev.preventDefault();

    setErrors(null);

    // If the property 'user.id' exist we are updating a user,
    // otherwise we ae creating a new user.
    if (user.id) {
      axiosClient
        .put(`/users/${user.id}`, user)
        .then(() => {
          setNotification("User was successfully updated.");
          navigate("/users");
        })
        .catch((error) => catchTheUserFormValidationErrors(error));
    } else {
      axiosClient
        .post(`/users`, user)
        .then(() => {
          setNotification("User was successfully created!");
          navigate("/users");
        })
        .catch((error) => catchTheUserFormValidationErrors(error));
    }
  };

  return (
    <div>
      {user.id && (
        <h1>
          Update User: {user.name} (id:{user.id})
        </h1>
      )}
      {!user.id && <h1>New User</h1>}
      <div className="card animated fadeInDown">
        {loading && <div className="text-center">Loading data...</div>}
        {errors && (
          <div className="alert">
            {Object.keys(errors).map((key) => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        )}
        {/**
          Note this onChange ...setUser() approach
          will cause the entire form to be rerendered when you type.
          In this count the user name in the heading.
        */}
        {!loading && (
          <form onSubmit={onSubmit}>
            <input
              value={user.name}
              onChange={(ev) => setUser({ ...user, name: ev.target.value })}
              type="text"
              name="name"
              id="name"
              placeholder="Name"
            />
            <input
              value={user.email}
              onChange={(ev) => setUser({ ...user, email: ev.target.value })}
              type="email"
              name="email"
              id="email"
              placeholder="Email"
            />
            <input
              onChange={(ev) => setUser({ ...user, password: ev.target.value })}
              type="password"
              name="password"
              id="password"
              placeholder="Password"
            />
            <input
              onChange={(ev) =>
                setUser({ ...user, password_confirmation: ev.target.value })
              }
              type="password"
              name="password-confirm"
              id="password-confirm"
              placeholder="Password Confirmation"
            />
            <button className="btn">Save</button>
          </form>
        )}
      </div>
    </div>
  );
}
