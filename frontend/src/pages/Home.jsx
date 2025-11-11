import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Loading } from "../components/Loading";

const HomePage = () => {
  const [userData, setUserData] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [Loagind, setLoading] = useState(true);

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
};

useEffect(() => {
  loadHomeData();
}, []);

const totalTasks = tasks.length;
const completedTasks = taks.filter((task) => task.is_completed).length;
const pendingTasks = totalTasks - completedTasks;

if (loading) {
  return (
    <main>
      <Loading />
    </main>
  );
}

