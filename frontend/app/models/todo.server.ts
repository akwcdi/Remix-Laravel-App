import { apiUrl, completeUrl, defaultUrl } from "frontend/app/util/url/url";

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

export async function deleteTodos(id: number): Promise<number[]> {
  return [id];
}

export async function completeTodos() {
  const res = await fetch(completeUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
}

export async function testTodos() {
  const url = apiUrl("/api/test");

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Add this line to parse the response body as JSON
  const data = await res.json();

  return data;
}

// export async function setTodos(): Promise<Array<string>> {

// }
