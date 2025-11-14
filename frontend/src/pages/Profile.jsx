import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loading } from "../components/Loading";

export const ProfilePage = ({ onLogout }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/profile", {
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setUserData(data.user);
      } else {
        console.error("error al obtener el perfil");
        onLogout();
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      onLogout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleLogoutClick = async () => {
    try {
      await fetch("http://localhost:3000/api/logout", {
        credentials: "include",
      });
    } catch (error) {
      console.error(error);
    } finally {
      onLogout();
    }
  };

  return (
    <main className="container-fluid py-4">
      <div className="container">
        {loading && <Loading />}

        <section className="card p-4">
          <div className="d-flex align-items-center gap-3 mb-3">
            <div
              className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
              style={{ width: 48, height: 48 }}
            >
              {userData?.name ? userData.name.charAt(0).toUpperCase() : "U"}
            </div>
            <div>
              <h1 className="h4 mb-0">
                {userData?.name
                  ? `${userData.name} ${userData.lastname}`
                  : "Mi Perfil"}
              </h1>
              <p className="mb-0">Información personal</p>
            </div>
          </div>

          {!loading && userData && (
            <div>
              <div className="mb-2">
                <span className="text-muted">Id de usuario:</span>
                <p className="mb-0">{userData.id}</p>
              </div>

              <div className="mb-2">
                <span className="text-muted">Nombre:</span>
                <p className="mb-0">{userData.name}</p>
              </div>

              <div className="mb-2">
                <span className="text-muted">Apellido:</span>
                <p className="mb-0">{userData.lastname}</p>
              </div>

              {userData.email && (
                <div className="mb-2">
                  <span className="text-muted">Correo:</span>
                  <p className="mb-0">{userData.email}</p>
                </div>
              )}

              <button
                className="btn btn-secondary mt-3"
                onClick={handleLogoutClick}
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};
