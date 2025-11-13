import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Loading } from "../components/Loading";

export const HomePage = () => {
  const [userData, setUserData] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadHomeData = async () => {
    try {
      const profilePromise = fetch("http://localhost:3000/api/profile", {
        credentials: "include",
      });
      const tasksPromise = fetch("http://localhost:3000/api/tasks-by-user", {
        credentials: "include",
      });

      const [profileRes, tasksRes] = await Promise.all([
        profilePromise,
        tasksPromise,
      ]);

      if (profileRes.ok) {
        const profileData = await profileRes.json();
        setUserData(profileData.user);
      } else {
        console.error("error al cargar el perfil");
      }

      if (tasksRes.ok) {
        const tasksData = await tasksRes.json();
        setTasks(
          tasksData.tasks || (Array.isArray(tasksData) ? tasksData : [])
        );
      } else {
        console.error("error al cargar tareas");
      }
    } catch (error) {
      console.error("error en las peticiones de home:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHomeData();
  }, []);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.is_completed).length;
  const pendingTasks = totalTasks - completedTasks;

  if (loading) {
    return (
      <main className="container-fluid py-4">
        <div className="container">
          <Loading />
        </div>
      </main>
    );
  }

  return (
    <main className="container-fluid py-4">
      <div className="container">
        <div className="card p-4 mb-4">
          <h1 className="mb-3">Bienvenido, {userData?.name || "Usuario"}</h1>

          <div className="row">
            <div className="col-md-3">
              <div className="card text-center p-3 mb-3">
                <h3 className="mb-0">{totalTasks}</h3>
                <p className="mb-0">Total tareas</p>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card text-center p-3 mb-3">
                <h3 className="mb-0">{completedTasks}</h3>
                <p className="mb-0">Completadas</p>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card text-center p-3 mb-3">
                <h3 className="mb-0">{pendingTasks}</h3>
                <p className="mb-0">Pendientes</p>
              </div>
            </div>

            <div className="col-md-3 d-flex align-items-center">
              <Link className="btn btn-primary" to="/tasks">
                Ir a mis tareas
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
