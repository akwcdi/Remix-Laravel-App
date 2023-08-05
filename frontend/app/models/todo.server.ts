import { apiUrl, defaultUrl, createUrl } from "frontend/app/util/url/url";

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

export async function deleteTodos(id: number): Promise<number[]> {
  return [id];
}
export async function testTodos() {
  const url = apiUrl("/api/test");

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  return data;
}
