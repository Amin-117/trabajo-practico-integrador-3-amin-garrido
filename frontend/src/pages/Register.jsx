import { useState } from "react";
import { Link } from "react-router";
import useForm from "../hooks/useForm";
import Loading from "../components/Loading";

const RegisterPage = ({ onLoginSuccess }) => {
  const { values, hanldeChange, handleReset } = useForm({
    username: "",
    email: "",
    password: "",
    firtname: "",
    lastname: "",
    dni: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name: values.firtname,
      lastname: values.lastname,
      username: values.username,
      emial: values.email,
      passwprd: values.password,
    };
    try {
      const res = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        onLoginSuccess();
      } else {
        console.error("error al registrar el usuario:", data.message);
        handleReset();
      }
    } catch (error) {
      console.error("error en la peticion de registro:", error);
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
      <h2>Crear cuenta</h2>
      <p>Completa los campos para registrarte</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Usuario</label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Nombre de usuario"
            value={values.username}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="correo@ejemplo.com"
            value={values.email}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={values.password}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </div>

        <div>
          <label htmlFor="firstname">Nombre</label>
          <input
            id="firstname"
            name="firstname"
            type="text"
            placeholder="Hai"
            value={values.firstname}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </div>

        <div>
          <label htmlFor="lastname">Apellido</label>
          <input
            id="lastname"
            name="lastname"
            type="text"
            placeholder="Weiss"
            value={values.lastname}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </div>

        <div>
          <label htmlFor="dni">DNI</label>
          <input
            id="dni"
            name="dni"
            type="text"
            placeholder="12345678"
            value={values.dni}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </div>

        <button type="submit">
          {loading ? "Registrando..." : "Registrarse"}
        </button>
      </form>

      <p>
        ¿Ya tienes cuenta? <Link to="/login">Iniciar Sesión</Link>
      </p>
    </div>
  </main>
);
