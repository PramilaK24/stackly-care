import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    return (
        <div className="min-h-dvh w-full">
            <Outlet />
        </div>
    );
};

export default AuthLayout;