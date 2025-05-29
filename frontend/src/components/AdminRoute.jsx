import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { isAuthenticated, isAdmin } from "../services/auth.service";

const AdminRoute = ({ children }) => {
  const location = useLocation();
  const authenticated = isAuthenticated();
  const adminUser = isAdmin();

  if (!authenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!adminUser) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
