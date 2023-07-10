export type Todos = {
  id?: number;
  newId: string;
  todos: string;
};

export async function getTodos(): Promise<Array<Todos>> {
  return [{ id: 0, newId: "default", todos: "default set" }];
}

// export async function setTodos(): Promise<Array<string>> {

// }
