import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../axios-client";

export default function UserForm() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(false);
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
          setUser(data.data);

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

  const onSubmit = (ev) => {
    ev.preventDefault();
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
        {/* Note this onChange ...setUser() approach wil cause the entire form to be rerendered when you type. */}
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
        </form>
      </div>
    </div>
  );
}
