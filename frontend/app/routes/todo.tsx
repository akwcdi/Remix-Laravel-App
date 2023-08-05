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
  const intent = formData.get("intent");
  if (intent) {
    switch (intent) {
      case "createTodo": {
        const createTodo = await InputTodos(request);
        return createTodo;
      }
      case "deleteTodo": {
        // ユーザーの削除処理
        const deleteTodo = await deleteTodos(request);
        return deleteTodo;
      }
    }
  } else {
    // intentが存在しない場合は、何かを返す
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
      { intent: "createTodo", newId: newId, todo: inputTodo }, // Pass the intent and todo value as parameters
      { action: "/todo", method: "post" } // Specify the action and method
    );
  };

  const onClickDelete: (
    index: number
  ) => MouseEventHandler<HTMLButtonElement> | undefined = (index: number) => {
    return async (event: React.MouseEvent<HTMLButtonElement>) => {
      const updatedList = [...(todoList ?? [])];
      const deleteId = updatedList[index].newId;
      setTodoList((todoList) =>
        todoList?.filter((item) => item.newId !== deleteId)
      );
      fetcher.submit(
        { intent: "deleteTodo", newId: deleteId }, // Pass the intent and todo value as parameters
        { action: "/todo", method: "post" } // Specify the action and method
      );
    };
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
