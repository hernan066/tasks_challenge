"use client";
import { useEffect } from "react";
import styles from "./styles/page.module.css";
import { TaskList } from "./components/TaskList";
import { TaskForm } from "./components/TaskForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, setFilter, setSearch } from "@/store/taskSlice";
import { openModal } from "@/store/uiSlice";

export default function HomePage() {
  const dispatch = useDispatch();
  const { isModalOpen } = useSelector((state) => state.ui);
  const { tasks, filter, search } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const openTaskModal = (task = null) => {
    dispatch(openModal(task));
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
            onChange={(e) => dispatch(setSearch(e.target.value))}
            className={styles.input}
            aria-label="Buscar tareas por título o descripción"
          />
          <label htmlFor="filter" className={styles.visuallyHidden}>
            Filtrar tareas
          </label>
          <select
            id="filter"
            onChange={(e) => dispatch(setFilter(e.target.value))}
            className={styles.select}
            aria-label="Filtrar tareas por estado"
          >
            <option value="all">Todas</option>
            <option value="completed">Completadas</option>
            <option value="pending">Pendientes</option>
          </select>
          <button
            className={styles.newTaskButton}
            onClick={() => openTaskModal()}
          >
            Nueva tarea
          </button>
        </div>

        <TaskList filteredTasks={filteredTasks} />
      </section>

      {isModalOpen && <TaskForm />}
    </main>
  );
}
