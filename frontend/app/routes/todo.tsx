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
  updateTodos,
} from "frontend/app/models/todo.server";
import { v4 as uuidv4 } from "uuid";

import styles from "frontend/app/styles/todo.css";

export const todolinks: LinksFunction = () => {
  return [...todoListlinks(), { rel: "stylesheet", href: styles }];
};

export const loader: LoaderFunction = async () => {
  const defaultTodos = await getTodos();
  return { defaultTodos };
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
      case "updateTodo": {
        const updateTodo = await updateTodos(request);
        return updateTodo;
      }
      case "deleteTodo": {
        const deleteTodo = await deleteTodos(request);
        return deleteTodo;
      }
    }
  } else {
    // intentが存在しない場合はnullを返す
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
    event.preventDefault();
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

  const onClickUpdate = (index: number, editedValue: string) => {
    if (todoList) {
      const updatedList = [...todoList];
      const updateId = updatedList[index].newId;

      setTodoList((prevTodoList) =>
        prevTodoList?.map((item) =>
          item.newId === updateId ? { ...item, todos: editedValue } : item
        )
      );

      fetcher.submit(
        { intent: "updateTodo", newId: updateId, todos: editedValue },
        { action: "/todo", method: "post" }
      );
    }
  };

  const onClickDelete: (
    index: number
  ) => MouseEventHandler<HTMLButtonElement> | undefined = (index: number) => {
    return async (event: React.MouseEvent<HTMLButtonElement>) => {
      const deleteList = [...(todoList ?? [])];
      const deleteId = deleteList[index].newId;
      setTodoList((todoList) =>
        todoList?.filter((item) => item.newId !== deleteId)
      );
      fetcher.submit(
        { intent: "deleteTodo", newId: deleteId },
        { action: "/todo", method: "post" }
      );
    };
  };

  return (
    <div className="todo">
      <Input
        input={inputTodo}
        onChange={onChangeTodoText}
        onClickInput={onClickInput}
        labelName="Input Todo:"
        buttonName="追加"
      />
      <TodoList
        todoList={todoList ?? []}
        onClickUpdate={(index, editedValue) =>
          onClickUpdate(index, editedValue)
        }
        onClickDelete={onClickDelete}
      />
    </div>
  );
};
export default Todo;
