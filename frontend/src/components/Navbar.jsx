import { link } from "react-router-dom";

export const Navbar = ({ isAuth, onLogout }) => {
  const handleLogoutClick = async () => {
    try {
      await fetch("http://localhost:3000/api/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("error al cerrar la sesion en el backend:", error);
    } finally {
      onLogout();
    }
  };
};

return (
  <nav>
    <h1>Garrido</h1>
    <div>
      {isAuth ? (
        <>
          <link to="/home">Inicio</link>
          <link to="/task">Tareas</link>
          <link to="/profile">Perfil</link>
          <button onClick={handleLogoutClick}>cerrar sesion</button>
        </>
      ) : (
        <>
          <link to="/login">iniciar sesion</link>
          <link to="/register">registrarse</link>
        </>
      )}
    </div>
  </nav>
);
