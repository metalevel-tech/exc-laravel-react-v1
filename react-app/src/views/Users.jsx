import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Users() {
  // See assets/screenshots/UserController->index->paginate->responseObject.png
  const [users, setUsers] = useState({ data: [], links: {}, meta: {} });
  const [loading, setLoading] = useState(false);
  const { setNotification } = useStateContext();

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = (page) => {
    setLoading(true);
    axiosClient
      .get(page ? "/users?page=" + page : "/users")
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
      setNotification(`The user with Id:${user.id} was successfully removed!`);
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
        {users.meta.links && (
          <ul className="pagination-list">
            {users.meta.links.map(
              (link, index, array) =>
                index != 0 &&
                index != array.length - 1 && (
                  <li
                    key={index}
                    className={
                      link.active
                        ? "btn-pagination highlight"
                        : "btn-pagination"
                    }
                    onClick={() => {
                      !link.active && getUsers(link.label);
                      // console.log(link.url);
                    }}
                  >
                    <div>{index}</div>
                  </li>
                )
            )}
          </ul>
        )}
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
