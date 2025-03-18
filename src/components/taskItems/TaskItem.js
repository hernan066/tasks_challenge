"use client";
import styles from "./taskItem.module.css";
import { AiOutlineCheck } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlineForm } from "react-icons/ai";

export default function TaskItem({ task, onUpdate, onDelete, onEdit }) {
  return (
    <div className={styles.taskItem}>
      <div>
        <h3 className={task.completed ? styles.completed : styles.incomplete}>
          {task.title}
        </h3>
        <p>{task.description}</p>
      </div>
      <div className={styles.actions}>
        <button onClick={() => onUpdate(task.id, task.completed)}>
          {task.completed ? (
            <AiOutlineClose size={20} />
          ) : (
            <AiOutlineCheck size={20} />
          )}
        </button>
        <button onClick={() => onEdit(task)}>
          <AiOutlineForm size={20} />
        </button>
        <button onClick={() => onDelete(task.id)}>
          <AiOutlineDelete size={20} />
        </button>
      </div>
    </div>
  );
}
