import { createTask, getAllTasks } from "./controllers";

export async function GET() {
  return getAllTasks();
}

export async function POST(req) {
  const data = await req.json();
  return createTask(data);
}
