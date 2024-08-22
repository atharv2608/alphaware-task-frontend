import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { logout } from "./authSlice";
import Cookies from "js-cookie";
import Navbar from "@/components/Navbar";

function ProtectedLayout() {
  const authStatus = useSelector((state) => state.auth.status);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (!token) {
      dispatch(logout());
    }
  }, [dispatch]);

  if (!authStatus) {
    return <Navigate to="/login" />;
  }

  return <>
    <Navbar/>
    <Outlet/>
    </>;
}

export default ProtectedLayout;
