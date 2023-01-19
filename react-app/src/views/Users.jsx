import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";

export default function Users() {
  // See assets/screenshots/UserController->index->paginate->responseObject.png
  const [users, setUsers] = useState({ data: [], links: {}, meta: {} });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    setLoading(true);
    axiosClient
      .get("/users")
      .then(({ data }) => {
        // console.log(data);
        setUsers(data);

        // Otherwise I can't see anything :)
        setTimeout(() => {
          setLoading(false);
        }, 250);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const onDelete = (user) => {
    const question = (id) =>
      `Are you sure you want to delete the user with Id:${id}?`;
    if (!window.confirm(question(user.id))) return;

    axiosClient.delete(`/users/${user.id}`).then(() => {
      // TODO: Display notification
      getUsers();
    });
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <h1>Users</h1>
        <Link to="/users/new" className="btn-add">
          Add new
        </Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Full Name</th>
              <th className="display-none-820">Email</th>
              <th className="display-none-1024">Create Date</th>
              <th style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          {loading && (
            <tbody>
              <tr>
                <td colSpan="5" className="text-center">
                  Loading data...
                </td>
              </tr>
            </tbody>
          )}
          {!loading && (
            <tbody>
              {users.data.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td className="display-none-820">{user.email}</td>
                  <td className="display-none-1024">{user.created_at}</td>
                  <td style={{ textAlign: "right" }}>
                    <Link to={"/users/" + user.id} className="btn-edit">
                      Edit
                    </Link>
                    &nbsp;
                    <button
                      onClick={(ev) => onDelete(user)}
                      className="btn-delete"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}
