import type {
  ActionFunction,
  LinksFunction,
  LoaderFunction,
} from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import type { MouseEventHandler } from "react";
import { useEffect, useState } from "react";
import Input from "frontend/app/components/Input";
import TodoList, { todoListlinks } from "frontend/app/components/TodoList";
import type { Todos } from "frontend/app/models/todo.server";
import {
  InputTodos,
  deleteTodos,
  getTodos,
  testTodos,
} from "frontend/app/models/todo.server";
import { v4 as uuidv4 } from "uuid";

import styles from "frontend/app/styles/todo.css";

export const todolinks: LinksFunction = () => {
  return [...todoListlinks(), { rel: "stylesheet", href: styles }];
};

export const loader: LoaderFunction = async () => {
  const defaultTodos = await getTodos();
  const test = await testTodos();
  return { defaultTodos, test };
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.clone().formData();
  console.log(formData);
  const intent = formData.get("intent");
  if (intent) {
    switch (intent) {
      case "createTodo": {
        console.log(formData.data.todo);
        const createTodo = await InputTodos();
        console.log(createTodo);
        return createTodo;
      }
      case "deleteUser": {
        // ユーザーの削除処理
        console.log(2);
        return null; // 何も返すものがない場合はnullを返す
      }
      default: {
        console.log(3);
        // intentがcreateUserでもdeleteUserでもない場合は、何かを返す
        return null;
      }
    }
  } else {
    // intentが存在しない場合は、何かを返す
    console.log(4);
    return null;
  }
};

const Todo = () => {
  // react-i18next needed
  //   const { t } = useTranslation();

  const { defaultTodos } = useLoaderData<typeof loader>();

  const [inputTodo, setInputTodo] = useState("");
  const [todoList, setTodoList] = useState<Todos[]>();

  const fetcher = useFetcher();

  useEffect(() => {
    setTodoList(
      defaultTodos.map((item: Todos[]) => {
        return item;
      })
    );
  }, []);

  const onChangeTodoText = (event: React.ChangeEvent<HTMLInputElement>) =>
    setInputTodo(event.target.value);

  const onClickInput = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault(); // Prevent the default form submission
    if (inputTodo === "") {
      return;
    }
    const newId = uuidv4();
    const newList = [...(todoList ?? []), { newId: newId, todos: inputTodo }];
    setTodoList(newList);
    setInputTodo("");

    fetcher.submit(
      { intent: "createTodo", todo: inputTodo }, // Pass the intent and todo value as parameters
      { action: "/todo", method: "post" } // Specify the action and method
    );
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
