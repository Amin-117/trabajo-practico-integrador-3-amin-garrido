import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "../hooks/useFrom";
import { Loading } from "../components/Loading";

export const RegisterPage = ({ onLoginSuccess }) => {
  const { values, handleChange, handleReset } = useForm({
    username: "",
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    dni: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name: values.firstname,
      lastname: values.lastname,
      username: values.username,
      email: values.email,
      password: values.password,
    };

    try {
      const res = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      const data = await res.json();
      console.log(data);

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

  return (
    <main className="container-fluid py-4">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card p-4">
              {loading && <Loading />}

              <h2 className="mb-3">Crear cuenta</h2>
              <p>Completa los campos para registrarte</p>

              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label htmlFor="username" className="form-label">
                      Usuario
                    </label>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      placeholder="Nombre de usuario"
                      value={values.username}
                      onChange={handleChange}
                      disabled={loading}
                      className="form-control"
                      required
                    />
                  </div>

                  <div className="mb-3 col-md-6">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="correo@ejemplo.com"
                      value={values.email}
                      onChange={handleChange}
                      disabled={loading}
                      className="form-control"
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Contraseña
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={values.password}
                    onChange={handleChange}
                    disabled={loading}
                    className="form-control"
                    required
                  />
                </div>

                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label htmlFor="firstname" className="form-label">
                      Nombre
                    </label>
                    <input
                      id="firstname"
                      name="firstname"
                      type="text"
                      placeholder="Nombre"
                      value={values.firstname}
                      onChange={handleChange}
                      disabled={loading}
                      className="form-control"
                      required
                    />
                  </div>

                  <div className="mb-3 col-md-6">
                    <label htmlFor="lastname" className="form-label">
                      Apellido
                    </label>
                    <input
                      id="lastname"
                      name="lastname"
                      type="text"
                      placeholder="Apellido"
                      value={values.lastname}
                      onChange={handleChange}
                      disabled={loading}
                      className="form-control"
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="dni" className="form-label">
                    DNI
                  </label>
                  <input
                    id="dni"
                    name="dni"
                    type="text"
                    placeholder="12345678"
                    value={values.dni}
                    onChange={handleChange}
                    disabled={loading}
                    className="form-control"
                    required
                  />
                </div>

                <button className="btn btn-primary" type="submit">
                  {loading ? "Registrando..." : "Registrarse"}
                </button>
              </form>

              <p className="mt-3">
                ¿Ya tienes cuenta? <Link to="/login">Iniciar Sesión</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
