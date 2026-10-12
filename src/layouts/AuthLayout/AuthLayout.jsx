import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = ({ children }) => {
  return (
    <div className="authlayout">
      {children || <Outlet />}
    </div>
  );
};

export default AuthLayout;
