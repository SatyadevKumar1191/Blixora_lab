import React from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, allowed }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (allowed && !allowed.includes(role)) {
    return <Navigate to="/dashboard" />;
  }

  return children;
}
