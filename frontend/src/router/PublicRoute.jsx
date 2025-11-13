// PublicRoute.jsx
import { Navigate, Outlet } from "react-router-dom";

export const PublicRoute = ({ authStatus }) => {
  if (authStatus === "authenticated") {
    return <Navigate to="/home" replace />;
  }
  return <Outlet />;
};
