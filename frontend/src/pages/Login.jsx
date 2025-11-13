import { useState } from "react";
import { Link } from "react-router";
import useForm from "../hooks/useFrom";
import { Loading } from "../components/Loading";

const LoadingPage = () => {
  const { values, handleChange, handleReset } = useForm({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (res.ok) {
        onloginSuccess();
      } else {
        alert(data.message || "credenciales invalidas");
        handleReset();
      }
    } catch (error) {
      console.error("error en la peticion de login:", error);
      handleReset();
    } finally {
      setLoading(false);
    }
  };
};

return (
  <main>
    {loading && <Loading />}

    <div>
      <h2>Bienvenido</h2>
      <p>Inicia sesión para continuar</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Usuario</label>
          <input
            id="username"
            type="text"
            name="username"
            value={values.username}
            onChange={handleChange}
            placeholder="Tu nombre de usuario"
            required
          />
        </div>

        <div>
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            placeholder="••••••••"
            required
          />
        </div>

        <button type="submit">Ingresar</button>
      </form>

      <p>
        ¿No tienes cuenta? <Link to="/register">Registrate</Link>
      </p>
    </div>
  </main>
);
