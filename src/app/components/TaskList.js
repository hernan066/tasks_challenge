import { TaskItem } from "./TaskItem";
import styles from "../styles/taskList.module.css";

export const TaskList = ({ filteredTasks }) => {
  return (
    <ul className={styles.taskList}>
      {filteredTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
      {filteredTasks.length === 0 && (
        <p className={styles.noTasksMessage}>No hay tareas que mostrar</p>
      )}
    </ul>
  );
};
