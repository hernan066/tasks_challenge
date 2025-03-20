"use client";
import styles from "../styles/taskItem.module.css";
import {
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineDelete,
  AiOutlineForm,
} from "react-icons/ai";
import { useDispatch } from "react-redux";
import { updateTask, deleteTask } from "@/store/taskSlice";
import { openModal } from "@/store/uiSlice";

export const TaskItem = ({ task }) => {
  const dispatch = useDispatch();

  return (
    <div className={styles.taskItem}>
      <div>
        <h3 className={task.completed ? styles.completed : styles.incomplete}>
          {task.title}
        </h3>
        <p>{task.description}</p>
      </div>
      <div className={styles.actions}>
        <button
          onClick={() =>
            dispatch(
              updateTask({
                ...task,
                completed: task.completed ? 0 : 1,
              })
            )
          }
        >
          {task.completed ? (
            <AiOutlineClose size={20} />
          ) : (
            <AiOutlineCheck size={20} />
          )}
        </button>
        <button onClick={() => dispatch(openModal(task))}>
          <AiOutlineForm size={20} />
        </button>
        <button onClick={() => dispatch(deleteTask(task.id))}>
          <AiOutlineDelete size={20} />
        </button>
      </div>
    </div>
  );
};
