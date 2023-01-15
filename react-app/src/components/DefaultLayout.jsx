import React from 'react';
import { Outlet } from 'react-router-dom';

export default function DefaultLayout() {
  return (
    <div>
      <div>
        For logged-in users only!
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
