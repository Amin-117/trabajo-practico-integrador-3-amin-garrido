import { Navigate } from "react-router-dom";

export const PublicRoute = ({ children, isAuth }) => {
  if (isAuth) {
    return <Navigate to="/home" />;
  }
  return children;
};
