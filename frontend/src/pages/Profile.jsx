import { useState, useEffect, use } from "react";
import { useNavigate } from "react-router";
import { Loading } from "../components/Loading";

const ProfilePage = ({ onLogout }) => {
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
        console.error("error al obtrener el perfil");
        onLogout();
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      onLogout();
    } finally {
      setLoading(fasle);
    }
  };
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
  <main>
    {loaging && <Loading />}

    <section>
      <div>
        <div>
          <div>
            {userData?.name ? userData.name.charAt(0).toUpperCase() : "U"}
          </div>
          <h1>
            {userData?.name
              ? `${userData.name} ${userData.lastname}`
              : "Mi Perfil"}
          </h1>
          <p>Informacion personal</p>
        </div>
        {!loading && userData && (
          <div>
            <div>
              <span>Id de usuario:</span>
              <p>{userData.id}</p>
            </div>

            <div>
              <span>Nombre:</span>
              <p>{userData.name}</p>
            </div>

            <div>
              <span>Apellido:</span>
              <p>{userData.lastname}</p>
            </div>

            {userData.email && (
              <div>
                <span>Correo:</span>
                <p>{userData.email}</p>
              </div>
            )}

            <button onClick={handleLogoutClick}>Cerrar sesion</button>
          </div>
        )}
      </div>
    </section>
  </main>
);
