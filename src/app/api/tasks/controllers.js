import { validationSchema } from "@/lib/validations";
import db from "../../../db/sqlite";
import { NextResponse } from "next/server";

async function validateData(data) {
  try {
    await validationSchema.validate(data, { abortEarly: false });
    return { valid: true, errors: null };
  } catch (validationErrors) {
    const errors = validationErrors.inner.map((error) => ({
      field: error.path,
      message: error.message,
    }));
    return { valid: false, errors };
  }
}

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

export async function createTask({ title, description }) {
  const { valid, errors } = await validateData({ title, description });
  if (!valid) return NextResponse.json({ errors }, { status: 400 });

  const stmt = db.prepare(
    "INSERT INTO tasks (title, description, completed) VALUES (?, ?, ?)"
  );
  const result = stmt.run(title, description || "", 0);
  const task = db
    .prepare("SELECT * FROM tasks WHERE id = ?")
    .get(result.lastInsertRowid);
  return NextResponse.json(task, { status: 201 });
}

export async function updateTask({ id, title, description, completed }) {
  const taskToUpdate = db.prepare("SELECT * FROM tasks WHERE id = ?").get(id);
  if (!taskToUpdate) {
    return NextResponse.json({ message: "Task not found" }, { status: 404 });
  }

  const { valid, errors } = await validateData({ title, description });
  if (!valid) return NextResponse.json({ errors }, { status: 400 });

  completed =
    completed !== undefined ? (completed ? 1 : 0) : taskToUpdate.completed;

  db.prepare(
    "UPDATE tasks SET title = ?, description = ?, completed = ? WHERE id = ?"
  ).run(
    title || taskToUpdate.title,
    description || taskToUpdate.description,
    completed,
    id
  );

  const updatedTask = db.prepare("SELECT * FROM tasks WHERE id = ?").get(id);
  return NextResponse.json(updatedTask);
}

export function deleteTask(id) {
  const taskToDelete = db.prepare("SELECT * FROM tasks WHERE id = ?").get(id);
  if (!taskToDelete) {
    return NextResponse.json({ message: "Task not found" }, { status: 404 });
  }
  db.prepare("DELETE FROM tasks WHERE id = ?").run(id);

  return new NextResponse(null, { status: 204 });
}
