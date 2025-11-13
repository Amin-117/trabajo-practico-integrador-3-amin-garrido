import { useState, useEffect } from "react";
import { AppRouter } from "./router/AppRouter";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { Loading } from "./components/Loading";

export const App = () => {
  const [authStatus, setAuthStatus] = useState("checking");

  const checkAuth = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/profile", {
        credentials: "include",
      });

      if (res.ok) {
        setAuthStatus("authenticated");
      } else {
        setAuthStatus("unauthenticated");
      }
    } catch (error) {
      console.error(error);
      setAuthStatus("unauthenticated");
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const handleLogin = () => {
    setAuthStatus("authenticated");
  };

  const handleLogout = () => {
    setAuthStatus("unauthenticated");
  };

  if (authStatus === "checking") {
    return (
      <div className="vh-100 d-flex align-items-center justify-content-center bg-light">
        <Loading />
      </div>
    );
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar authStatus={authStatus} onLogout={handleLogout} />

      <div className="flex-grow-1">
        <AppRouter
          authStatus={authStatus}
          onLogin={handleLogin}
          onLogout={handleLogout}
        />
      </div>

      <Footer />
    </div>
  );
};
