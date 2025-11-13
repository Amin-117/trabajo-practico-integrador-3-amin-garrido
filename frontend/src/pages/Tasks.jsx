import { useState, useEffect, useEffectEvent } from "react";
import { Loading } from "../components/Loading";
import { useForm } from "../hooks/useFrom";

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const { values, handleChange, handleReset } = useForm({
    tittle: "",
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
        console.error("error al obtener las tareas", error);
        setTasks([]);
      }
    } catch (error) {
      console.error(error);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };
};

useEffect(() => {
  fetchTasks();
}, []);

const handleSumit = async (e) => {
  e.prevenDefault();

  if (idToEdit) {
    hanldeUpdateTask();
  } else {
    hanldeCreateTaks();
  }
};

const handleSelectEdit = (task) => {
  setIdToEdit(task.id);
  setValues({
    tittle: task.tittle,
    description: task.description,
    is_completed: task.is_completed,
  });
};

const hanldeCancelEdit = () => {
  setIdToEdit(null);
  hanldeReset();
};

const hanldeCreateTaks = async () => {
  if (!values.tittle) {
    alert("el titulo es obligatorio");
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
      alert("tarea creada exitosamente");
      hanldeReset();
      fetchTasks();
    } else {
      const data = await res.json();
      alert(data.message || "error al crear tarea");
    }
  } catch (error) {
    console.error(error);
    alert("error de la conexion al crear tarea");
  }
};

const hanldeUpdateTask = async () => {
  if (!values.tittle) {
    alert("el titulo es obligatorio");
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
      alert("tarea actualizada correctamente");
      hanldeCancelEdit();
      fetchTasks();
    } else {
      const data = await res.json();
      alert(data.message || "error al actualizar la tarea");
    }
  } catch (error) {
    console.error(error);
    alert("error de la conexion al actualizar la tarea");
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
