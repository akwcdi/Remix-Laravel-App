import type { LinksFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { MouseEventHandler } from "react";
import { useEffect, useState } from "react";
import Input from "frontend/app/components/Input";
import TodoList, { todoListlinks } from "frontend/app/components/TodoList";
import type { Todos } from "frontend/app/models/todo.server";
import {
  deleteTodos,
  getTodos,
  testTodos,
} from "frontend/app/models/todo.server";
import { v4 as uuidv4 } from "uuid";

import styles from "frontend/app/styles/todo.css";

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

  const { defaultTodos } = useLoaderData<typeof loader>();

  const [inputTodo, setInputTodo] = useState("");
  const [todoList, setTodoList] = useState<Todos[]>();

  useEffect(() => {
    setTodoList(
      defaultTodos.map((item) => {
        return item;
      })
    );
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
    return async (event: React.MouseEvent<HTMLButtonElement>) => {
      const updatedList = [...(todoList ?? [])];
      const itemId = updatedList[index].id;
      const deleteId = updatedList[index].newId;

      try {
        setTodoList((todoList) =>
          todoList?.filter((item) => item.newId !== deleteId)
        );
        if (itemId !== undefined) {
          await deleteTodos(itemId);
        }
      } catch (e) {
        console.error(e);
      }
    };
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
