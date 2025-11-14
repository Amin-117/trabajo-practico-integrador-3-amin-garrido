import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "../hooks/useFrom";
import { Loading } from "../components/Loading";

export const LoginPage = ({ onLoginSuccess }) => {
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
        body: JSON.stringify(values),
        credentials: "include",
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        onLoginSuccess();
      } else {
        alert(data.message || "Credenciales inválidas");
        handleReset();
      }
    } catch (error) {
      console.error("error en la peticion de login:", error);
      handleReset();
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container-fluid py-4">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card p-4">
              {loading && <Loading />}

              <h2 className="mb-3">Bienvenido</h2>
              <p>Inicia sesión para continuar</p>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Usuario
                  </label>
                  <input
                    id="username"
                    type="text"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    placeholder="Tu nombre de usuario"
                    className="form-control"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Contraseña
                  </label>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="form-control"
                    required
                  />
                </div>

                <button className="btn btn-primary" type="submit">
                  Ingresar
                </button>
              </form>

              <p className="mt-3">
                ¿No tienes cuenta? <Link to="/register">Registrate</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
