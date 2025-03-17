import db from "../../db/sqlite";
import { NextResponse } from "next/server";

export function getAllTasks() {
  const tasks = db.prepare("SELECT * FROM tasks ORDER BY createdAt DESC").all();
  return NextResponse.json(tasks);
}

export function getTaskById(id) {
  const task = db.prepare("SELECT * FROM tasks WHERE id = ?").get(id);
  if (!task)
    return NextResponse.json({ message: "Task not found" }, { status: 404 });
  return NextResponse.json(task);
}

export function createTask({ title, description }) {
  if (!title)
    return NextResponse.json({ message: "Title is required" }, { status: 400 });
  const stmt = db.prepare(
    "INSERT INTO tasks (title, description, completed) VALUES (?, ?, ?)"
  );
  const result = stmt.run(title, description || "", 0);
  const task = db
    .prepare("SELECT * FROM tasks WHERE id = ?")
    .get(result.lastInsertRowid);
  return NextResponse.json(task, { status: 201 });
}

export function updateTask({ id, title, description, completed }) {
  // Si 'completed' es undefined, lo dejamos en false

  const taskToUpdate = db.prepare("SELECT * FROM tasks WHERE id = ?").get(id);
  if (!taskToUpdate) {
    return NextResponse.json({ message: "Task not found" }, { status: 404 });
  }

  completed = completed !== undefined ? completed : taskToUpdate.completed;

  db.prepare(
    "UPDATE tasks SET title = ?, description = ?, completed = ? WHERE id = ?"
  ).run(title, description || taskToUpdate.description, completed, id);

  const updatedTask = db.prepare("SELECT * FROM tasks WHERE id = ?").get(id);

  return NextResponse.json(updatedTask || { message: "Task not found" });
}

export function deleteTask(id) {
  db.prepare("DELETE FROM tasks WHERE id = ?").run(id);
  return NextResponse.json({}, { status: 204 });
}
