import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';

export default function GuestLayout() {
  const { token } = useStateContext();
  // debugger;

  if (token) { // The user is authenticated
    return <Navigate to="/" />;
  }

  return (
    <div>
      <div>
        For guest users only.
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
