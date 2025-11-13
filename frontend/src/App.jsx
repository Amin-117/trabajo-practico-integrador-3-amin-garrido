import { useState, useEffect } from "react";
import AppRouter from "./router/AppRouter";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Loading from "./components/Loading";

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
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <Navbar authStatus={authStatus} onLogout={handleLogout} />

      <AppRouter
        authStatus={authStatus}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />

      <Footer />
    </>
  );
};
