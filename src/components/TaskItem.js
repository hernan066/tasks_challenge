"use client";
export default function TaskItem({ task, onUpdate, onDelete }) {
  return (
    <div className="task-item">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <label>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onUpdate(task.id, { completed: !task.completed })}
        />
        Completado
      </label>
      <button onClick={() => onDelete(task.id)}>Eliminar</button>
    </div>
  );
}
