import { createTask, deleteTask, getAllTasks, updateTask } from "./controllers";

export async function GET() {
  return getAllTasks();
}

export async function POST(req) {
  const data = await req.json();
  return createTask(data);
}

export async function PUT(req) {
  const data = await req.json();
  return updateTask(data);
}

export async function DELETE(req) {
  return deleteTask(id);
}
