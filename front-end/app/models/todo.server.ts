export type Todos = {
  id: number;
  todos: string;
};

export async function getTodos(): Promise<Array<Todos>> {
  return [{ id: 0, todos: "default set" }];
}

// export async function setTodos(): Promise<Array<string>> {

// }
