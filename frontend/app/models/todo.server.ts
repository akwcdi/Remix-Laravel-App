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

  const contentType = res.headers.get("content-type");
  const text = await res.text();

  if (contentType && contentType.includes("application/json")) {
    return JSON.parse(text); // safe
  } else {
    console.error("⚠️ API response is not JSON:", text);
    throw new Error("API response is not valid JSON");
  }
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
