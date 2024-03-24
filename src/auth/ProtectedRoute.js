import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
const ProtectedRoute = () => {
  // console.log(<Outlet/>)
  const token = useSelector((state) => state.token)
  
  return token ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate to="/authentication/sign-in" />
  );
};

export default ProtectedRoute;