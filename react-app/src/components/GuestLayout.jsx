import React from 'react';
import { Outlet } from 'react-router-dom';

export default function GuestLayout() {
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
