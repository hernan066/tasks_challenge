"use client";
import { useState, useEffect } from "react";
import styles from "./styles/page.module.css";
import { TaskList } from "./components/TaskList";
import { TaskForm } from "./components/TaskForm";

export default function HomePage() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await fetch("/api/tasks");
    const data = await res.json();
    setTasks(data);
  };

  const toggleTaskCompletion = async (id, completed) => {
    await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: completed ? 0 : 1 }),
    });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await fetch(`/api/tasks/${id}`, { method: "DELETE" });
    fetchTasks();
  };

  const openModal = (task = null) => {
    setSelectedTask(task);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedTask(null);
  };

  const filteredTasks = tasks.filter(
    (task) =>
      (filter === "all" ||
        (filter === "completed" && task.completed) ||
        (filter === "pending" && !task.completed)) &&
      (task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <main className={styles.container}>
      <section className={styles.taskManager}>
        <header className={styles.header}>
          <h1>Gestor de Tareas</h1>
          <p>Organiza y gestiona tus tareas de manera eficiente</p>
        </header>

        <div className={styles.toolbar}>
          <label htmlFor="search" className={styles.visuallyHidden}>
            Buscar tareas
          </label>
          <input
            id="search"
            type="text"
            placeholder="Buscar por título o descripción..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.input}
            aria-label="Buscar tareas por título o descripción"
          />
          <label htmlFor="filter" className={styles.visuallyHidden}>
            Filtrar tareas
          </label>
          <select
            id="filter"
            onChange={(e) => setFilter(e.target.value)}
            className={styles.select}
            aria-label="Filtrar tareas por estado"
          >
            <option value="all">Todas</option>
            <option value="completed">Completadas</option>
            <option value="pending">Pendientes</option>
          </select>
          <button className={styles.newTaskButton} onClick={() => openModal()}>
            Nueva tarea
          </button>
        </div>

        <TaskList
          filteredTasks={filteredTasks}
          toggleTaskCompletion={toggleTaskCompletion}
          deleteTask={deleteTask}
          openModal={openModal}
        />
      </section>

      {modalOpen && (
        <TaskForm
          task={selectedTask}
          onClose={closeModal}
          refreshTasks={fetchTasks}
        />
      )}
    </main>
  );
}
