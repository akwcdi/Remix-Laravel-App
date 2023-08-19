import {
  defaultUrl,
  createUrl,
  deleteUrl,
  updateUrl,
} from "frontend/app/util/url/url";

export type Todos = {
  id?: number;
  newId: string;
  todos: string;
};

export async function getTodos(): Promise<Array<Todos>> {
  const res = await fetch(defaultUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
}

export async function InputTodos(request: Request): Promise<Array<Todos>> {
  const formData = await request.clone().formData();
  const todo = formData.get("todo");
  const newId = formData.get("newId");
  const res = await fetch(createUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ newId, todo }),
  });
  const data = await res.json();
  return data;
}

export const updateTodos = async (request: Request) => {
  const formData = await request.clone().formData();
  const newId = formData.get("newId");
  const todo = formData.get("todos");

  const res = await fetch(updateUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ newId, todo }),
  });
  const data = await res.json();
  return data;
};

export const deleteTodos = async (request: Request) => {
  const formData = await request.clone().formData();
  const newId = formData.get("newId");

  const res = await fetch(deleteUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ newId }),
  });
  const data = await res.json();
  return data;
};
