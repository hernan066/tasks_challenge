import { getTaskById, updateTask, deleteTask } from "../controllers";

export async function GET(req, { params }) {
  return getTaskById(params.id);
}

export async function PUT(req, { params }) {
  const data = await req.json();
  return updateTask({ ...data, id: params.id });
}

export async function DELETE(req, { params }) {
  return deleteTask(params.id);
}
