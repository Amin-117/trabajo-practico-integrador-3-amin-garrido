// PrivateRoute.jsx
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = ({ authStatus }) => {
  if (authStatus !== "authenticated") {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};
