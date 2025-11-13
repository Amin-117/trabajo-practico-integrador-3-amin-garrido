import { useState, useEffect } from "react";
import { Loading } from "../components/Loading";
import useForm from "../hooks/useFrom";

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const { values, setValues, handleChange, handleReset } = useForm({
    title: "",
    description: "",
    is_completed: false,
  });

  const [idToEdit, setIdToEdit] = useState(null);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/tasks-by-user", {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setTasks(data.tasks || (Array.isArray(data) ? data : []));
      } else {
        const data = await res.json().catch(() => ({}));
        console.error("error al obtener las tareas", data);
        setTasks([]);
      }
    } catch (error) {
      console.error(error);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

const handleSubmit = async (e) => {
  e.preventDefault();

  if (idToEdit) {
    await handleUpdateTask();
  } else {
    await handleCreateTask();
  }
};

const handleSelectEdit = (task) => {
  setIdToEdit(task.id);
  setValues({
    title: task.title,
    description: task.description,
    is_completed: task.is_completed,
  });
};

const handleCancelEdit = () => {
  setIdToEdit(null);
  handleReset();
};

const handleCreateTask = async () => {
  if (!values.title) {
    alert("El título es obligatorio");
    return;
  }
  try {
    const res = await fetch("http://localhost:3000/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(values),
    });
    if (res.ok) {
      alert("Tarea creada exitosamente");
      handleReset();
      fetchTasks();
    } else {
      const data = await res.json().catch(() => ({}));
      alert(data.message || "Error al crear tarea");
    }
  } catch (error) {
    console.error(error);
    alert("Error de la conexión al crear tarea");
  }
};

const handleUpdateTask = async () => {
  if (!values.title) {
    alert("El título es obligatorio");
    return;
  }
  try {
    const res = await fetch(`http://localhost:3000/api/tasks/${idToEdit}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(values),
    });

    if (res.ok) {
      alert("Tarea actualizada correctamente");
      handleCancelEdit();
      fetchTasks();
    } else {
      const data = await res.json().catch(() => ({}));
      alert(data.message || "Error al actualizar la tarea");
    }
  } catch (error) {
    console.error(error);
    alert("Error de la conexión al actualizar la tarea");
  }
};

const handleDeleteTask = async (taskId) => {
  if (!window.confirm("¿estas seguro de querer borrar esta tarea?")) {
    return;
  }
  try {
    const res = await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (res.ok) {
      alert("tarea eliminada correctamente");
      fetchTasks();
    } else {
      const data = await res.json();
      alert(data.message || "error al eliminar la tarea");
    }
  } catch (error) {
    console.error(error);
    alert("error de la conexion al eliminar la tarea");
  }
};

  return (
    <main>
      <div>
        <section>
          <h2>{idToEdit ? "Editar" : "Crear"} Tarea</h2>

          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="title">Título</label>
              <input
                type="text"
                id="title"
                name="title"
                value={values.title}
                onChange={handleChange}
                placeholder="Ej: Comprar leche"
              />
            </div>

            <div>
              <label htmlFor="description">Descripción</label>
              <textarea
                id="description"
                name="description"
                value={values.description}
                onChange={handleChange}
                placeholder="Detalles de la tarea..."
              ></textarea>
            </div>

            <div>
              <input
                type="checkbox"
                id="is_completed"
                name="is_completed"
                checked={values.is_completed}
                onChange={handleChange}
              />
              <label htmlFor="is_completed">Marcar como completada</label>
            </div>

            <button type="submit">
              {idToEdit ? "Actualizar Tarea" : "Guardar Tarea"}
            </button>

            {idToEdit && (
              <button type="button" onClick={handleCancelEdit}>
                Cancelar Edición
              </button>
            )}
          </form>
        </section>

        <section>
          <h2>Mis Tareas</h2>

          {loading && <Loading />}

          {!loading && (
            <>
              {tasks.length === 0 ? (
                <p>No tienes tareas. ¡Agrega una!</p>
              ) : (
                <div>
                  {tasks.map((task) => (
                    <div key={task.id}>
                      <div>
                        <h3>
                          {task.title} {task.is_completed ? "(Completada)" : ""}
                        </h3>
                        <p>{task.description}</p>
                      </div>

                      <div>
                        <button onClick={() => handleSelectEdit(task)}>
                          Editar
                        </button>
                        <button onClick={() => handleDeleteTask(task.id)}>
                          Borrar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </main>
  );
};

export default TasksPage;
