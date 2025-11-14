import { useState, useEffect } from "react";
import { Loading } from "../components/Loading";
import { useForm } from "../hooks/useFrom";

export const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const { values, setValues, handleChange, handleReset } = useForm({
    title: "",
    description: "",
    is_completed: false,
  });

  const [idToEdit, setIdToEdit] = useState(null);

  const fetchTasks = async () => {
    if (tasks.length === 0) {
      setLoading(true);
    }
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
    <main className="container-fluid py-4">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="card p-3 mb-3">
              <h2 className="h5">{idToEdit ? "Editar" : "Crear"} Tarea</h2>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Título
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    placeholder="Ej: Comprar leche"
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Descripción
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    placeholder="Detalles de la tarea..."
                    className="form-control"
                  ></textarea>
                </div>

                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="is_completed"
                    name="is_completed"
                    checked={values.is_completed}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="is_completed">
                    Marcar como completada
                  </label>
                </div>

                <div className="d-flex gap-2">
                  <button className="btn btn-primary" type="submit">
                    {idToEdit ? "Actualizar Tarea" : "Guardar Tarea"}
                  </button>

                  {idToEdit && (
                    <button
                      className="btn btn-secondary"
                      type="button"
                      onClick={handleCancelEdit}
                    >
                      Cancelar Edición
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card p-3">
              <h2 className="h5">Mis Tareas</h2>

              {loading && <Loading />}

              {!loading && (
                <>
                  {tasks.length === 0 ? (
                    <p>No tienes tareas. ¡Agrega una!</p>
                  ) : (
                    <div className="list-group">
                      {tasks.map((task) => (
                        <div
                          key={task.id}
                          className="list-group-item d-flex justify-content-between align-items-start"
                        >
                          <div>
                            <h5 className="mb-1">
                              {task.title}{" "}
                              {task.is_completed ? (
                                <span className="badge bg-success ms-2">
                                  Completada
                                </span>
                              ) : null}
                            </h5>
                            <p className="mb-0">{task.description}</p>
                          </div>
                          <div className="d-flex flex-column gap-2">
                            <button
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => handleSelectEdit(task)}
                            >
                              Editar
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDeleteTask(task.id)}
                            >
                              Borrar
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
