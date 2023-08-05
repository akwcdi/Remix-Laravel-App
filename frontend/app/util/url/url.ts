import { BACKEND_URL } from "frontend/app/util/config";

export const apiUrl = (path: string) => {
  return new URL(`${BACKEND_URL}${path}`);
};

export const defaultUrl = apiUrl("/api/todos");
export const createUrl = apiUrl("/api/todos/create");
export const deleteUrl = apiUrl("/api/todos/delete");
