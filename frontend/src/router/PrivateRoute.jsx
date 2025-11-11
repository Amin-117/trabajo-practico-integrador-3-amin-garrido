import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children, isAuth }) => {
  if (!isAuth) {
    return <Navigate to="/login" />;
  }
  return children;
};
