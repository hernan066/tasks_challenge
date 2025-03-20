import { TaskItem } from "./TaskItem";
import styles from "../styles/taskList.module.css";
import { useSelector } from "react-redux";
import { Loader } from "./Loader";

export const TaskList = ({ filteredTasks }) => {
  const { loading } = useSelector((state) => state.tasks);

  if (loading) {
    return (
      <div className={styles.loadingMessage}>
        <Loader />
      </div>
    );
  }

  return (
    <>
      {filteredTasks && (
        <ul className={styles.taskList}>
          {filteredTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </ul>
      )}
      {filteredTasks && !loading && filteredTasks.length === 0 && (
        <p className={styles.noTasksMessage}>No hay tareas que mostrar</p>
      )}
    </>
  );
};
