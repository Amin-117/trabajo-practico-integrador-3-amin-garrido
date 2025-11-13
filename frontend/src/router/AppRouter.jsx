import { Navigate, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

// Paginas
import { HomePage } from "../pages/Home";
import { LoginPage } from "../pages/Login";
import { RegisterPage } from "../pages/Register";
import { ProfilePage } from "../pages/Profile";
import { TasksPage } from "../pages/Tasks";

export const AppRouter = ({ authStatus, onLogin, onLogout }) => {
  return (
    <Routes>
      <Route element={<PublicRoute isAuth={authStatus} />}>
        <Route path="/login" element={<LoginPage onLoginSuccess={onLogin} />} />
        <Route
          path="/register"
          element={<RegisterPage onLoginSuccess={onLogin} />}
        />
      </Route>

      <Route element={<PrivateRoute isAuth={authStatus} />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage onLogout={onLogout} />} />
        <Route path="/tasks" element={<TasksPage />} />
      </Route>

      <Route
        path="*"
        element={<Navigate to={authStatus ? "/home" : "/login"} />}
      />
    </Routes>
  );
};
