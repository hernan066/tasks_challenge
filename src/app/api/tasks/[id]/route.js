import { getTaskById, updateTask, deleteTask } from "../controllers";

export async function GET(req, context) {
  const params = await context.params;
  return getTaskById(params.id);
}

export async function PUT(req, context) {
  const params = await context.params;
  const data = await req.json();
  return updateTask({ ...data, id: params.id });
}

export async function DELETE(req, context) {
  const params = await context.params;
  return deleteTask(params.id);
}
