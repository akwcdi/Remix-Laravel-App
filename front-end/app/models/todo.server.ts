export type Todos = {
  id?: number;
  newId: string;
  todos: string;
};

export async function getTodos(): Promise<Array<Todos>> {
  const defaultset = { id: 0, newId: "default", todos: "default set" };
  // const res = await fetch("/todos/get");
  return [defaultset];
}
export async function deleteTodos(id: number): Promise<number[]> {
  return [id];
}

// export async function setTodos(): Promise<Array<string>> {

// }
