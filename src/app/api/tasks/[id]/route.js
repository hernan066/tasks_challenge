import { getTaskById } from "../controllers";

export async function GET(req, { params }) {
  return getTaskById(params.id);
}
