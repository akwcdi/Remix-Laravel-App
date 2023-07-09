import type { LinksFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import Input from "front-end/app/components/Input";
import TodoList, { todoListlinks } from "front-end/app/components/TodoList";
import type { Todos } from "front-end/app/models/todo.server";
import { getTodos } from "front-end/app/models/todo.server";

import styles from "front-end/app/styles/todo.css";

export const todolinks: LinksFunction = () => {
  return [...todoListlinks(), { rel: "stylesheet", href: styles }];
};

export const loader = async () => {
  const defaultTodos = await getTodos();
  return { defaultTodos };
};

const Todo = () => {
  // react-i18next needed
  //   const { t } = useTranslation();

  const defaultTodos = useLoaderData<typeof loader>()?.defaultTodos;

  const [inputTodo, setInputTodo] = useState("");
  const [todoList, setTodoList] = useState<Todos[]>();

  useEffect(() => {
    setTodoList(defaultTodos);
  }, []);

  const onChangeTodoText = (event: React.ChangeEvent<HTMLInputElement>) =>
    setInputTodo(event.target.value);

  const onClickInput = () => {
    const newList = [
      ...(todoList ?? []),
      { id: todoList?.length ?? 0, todos: inputTodo },
    ];
    setTodoList(newList);
    console.log(newList);
    setInputTodo("");
  };

  const onClickComplete = () => {
    console.log(todoList);
    // ここにserver.tsから値をsetする関数を呼び出す
  };

  return (
    <div>
      <div className="header">
        <button onClick={onClickComplete}>完了</button>
        <Input
          input={inputTodo}
          onChange={onChangeTodoText}
          onClick={onClickInput}
          labelName="Input Todo:"
          buttonName="追加"
        />
      </div>
      <TodoList todoList={todoList ?? []} />
    </div>
  );
};
export default Todo;
