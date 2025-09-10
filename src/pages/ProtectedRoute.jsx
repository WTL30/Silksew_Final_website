import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, role }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  // If no user is logged in → redirect to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If a role is specified, check it
  if (role && user.role?.toLowerCase() !== role.toLowerCase()) {
    // Redirect non-authorized users to home (or error page)
    return <Navigate to="/" replace />;
  }

  // ✅ Authorized → render children
  return children;
};

export default ProtectedRoute;
