import type { LinksFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { MouseEventHandler } from "react";
import { useEffect, useState } from "react";
import Input from "front-end/app/components/Input";
import TodoList, { todoListlinks } from "front-end/app/components/TodoList";
import type { Todos } from "front-end/app/models/todo.server";
import {
  deleteTodos,
  getTodos,
  testTodos,
} from "front-end/app/models/todo.server";
import { v4 as uuidv4 } from "uuid";

import styles from "front-end/app/styles/todo.css";

export const todolinks: LinksFunction = () => {
  return [...todoListlinks(), { rel: "stylesheet", href: styles }];
};

export const loader = async () => {
  const defaultTodos = await getTodos();
  const test = await testTodos();
  return { defaultTodos, test };
};

const Todo = () => {
  // react-i18next needed
  //   const { t } = useTranslation();

  const { defaultTodos, test } = useLoaderData<typeof loader>();

  const [inputTodo, setInputTodo] = useState("");
  const [todoList, setTodoList] = useState<Todos[]>();

  useEffect(() => {
    setTodoList(defaultTodos);
    console.log(test);
  }, []);

  const onClickComplete = () => {
    console.log(todoList);
    // ここにserver.tsから値をcreate,updateする関数を呼び出す
  };

  const onChangeTodoText = (event: React.ChangeEvent<HTMLInputElement>) =>
    setInputTodo(event.target.value);

  const onClickInput = () => {
    if (inputTodo === "") {
      return;
    }
    const newId = uuidv4();
    const newList = [...(todoList ?? []), { newId: newId, todos: inputTodo }];
    setTodoList(newList);
    setInputTodo("");
  };

  const onClickDelete: (
    index: number
  ) => MouseEventHandler<HTMLButtonElement> | undefined = (index: number) => {
    if (index !== undefined) {
      return async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const deletedList = [...(todoList ?? [])];
        deletedList?.splice(index, 1);
        setTodoList(deletedList);
        await deleteTodos(index);
      };
    }
    return undefined;
    // ここにserver.tsから値をdeleteする関数を呼び出す
  };

  return (
    <div>
      <div className="header">
        <button onClick={onClickComplete}>完了</button>
        <Input
          input={inputTodo}
          onChange={onChangeTodoText}
          onClickInput={onClickInput}
          labelName="Input Todo:"
          buttonName="追加"
        />
      </div>
      <TodoList
        todoList={todoList ?? []}
        onClickDelete={onClickDelete}
        buttonName="削除"
      />
    </div>
  );
};
export default Todo;
