import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // het users...
  }, []);

  const getUsers = () => {
    setLoading(true);
    axiosClient
      .get("/users")
      .then(({ data }) => {
        console.log(data);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  return <div>Users</div>;
}
