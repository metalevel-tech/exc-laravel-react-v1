import React from 'react';
import { Navigate, Outlet, Link } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';

export default function DefaultLayout() {
  const { user, token } = useStateContext();

  if (!token) {
    // The user is NOT authenticated
    return <Navigate to="/login" />;
  }

  /**
   * The <Link> tags are react Router tags.
   * Remember within JSX we using `className` in place of HTML `class`.
   */
  return (
    <div id="defaultLayout">
      <aside>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/users">Users</Link>
      </aside>

      <div className="content">
        <header>
          <div>
            Header
          </div>

          <div>
            User info
          </div>
        </header>

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
