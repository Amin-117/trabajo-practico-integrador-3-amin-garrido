import { Navigate, Route, Routes } from "react-router";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";

// Paginas
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import ProfilePage from "../pages/ProfilePage";
import TasksPage from "../pages/TasksPage";

export const AppRouter = ({ authStatus, onLogin, onLogout }) => {
  return (
    <Routes>
      <Route element={<PublicRoutes authStatus={authStatus} />}>
        <Route path="/login" element={<LoginPage onLoginSuccess={onLogin} />} />
        <Route
          path="/register"
          element={<RegisterPage onLoginSuccess={onLogin} />}
        />
      </Route>

      <Route element={<PrivateRoutes authStatus={authStatus} />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage onLogout={onLogout} />} />
        <Route path="/tasks" element={<TasksPage />} />
      </Route>

      <Route
        path="*"
        element={
          <Navigate to={authStatus === "authenticated" ? "/home" : "/login"} />
        }
      />
    </Routes>
  );
};
