import React, { useEffect } from "react";
import { Navigate, Outlet, Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function DefaultLayout() {
  const { user, token, setUser, setToken } = useStateContext();

  if (!token) {
    // The user is NOT authenticated
    return <Navigate to="/login" />;
  }

  const onLogout = (ev) => {
    ev.preventDefault();

    axiosClient.post("/logout").then(() => {
      // This will cause React page rerender and
      // the user will be navigated to the login page.
      setUser({});
      setToken(null);
    });
  };

  /**
   * Here we get the User's data from the server,
   * when it is authenticated (have token),
   * and the page is reloaded.
   *
   * Otherwise the default value '...' will appear
   * in the top bar: https://youtu.be/qJq9ZMB2Was?t=6222
   *
   * See the first directive in: laravel-app/routes/api.php
   * The uri '/user' is available only for authenticated users.
   *
   * [] means we listen to the component did mount event.
   * { data: user } - here we destructure the response and then
   * assigning the value of 'data' to the variable 'user'.
   */
  useEffect(() => {
    axiosClient.get("/user").then(({ data: user }) => {
      setUser(user);
    });
  }, []);

  return (
    <div id="defaultLayout">
      <aside>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/users">Users</Link>
      </aside>

      <div className="content">
        <header>
          <div>Header</div>

          <div>
            {user.name}
            <a href="#" onClick={onLogout} className="btn-logout">
              Logout
            </a>
          </div>
        </header>

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
