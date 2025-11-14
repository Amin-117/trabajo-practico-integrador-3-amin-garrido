import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = ({ isAuth }) => {
  console.log(isAuth, "desde private route");
  if (isAuth === "checking") return null; // o un spinner

  // if (authStatus !== "authenticated") {
  //   return <Navigate to="/login" replace />;
  // }

  // return <Outlet />;

  return isAuth == "authenticated" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};
