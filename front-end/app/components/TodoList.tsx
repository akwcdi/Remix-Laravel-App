import type { LinksFunction } from "@remix-run/node";
import type { Todos } from "front-end/app/models/todo.server";

import styles from "front-end/app/styles/todo.css";
import type { MouseEventHandler } from "react";

export type ListProps = {
  todoList: Todos[];
  onClickDelete: (
    index: number
  ) => MouseEventHandler<HTMLButtonElement> | undefined;
  buttonName?: string;
};

export const todoListlinks: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

const TodoList: React.FC<ListProps> = ({
  todoList,
  onClickDelete,
  buttonName,
}) => {
  const todo = todoList.map((t, index) => (
    <ul key={t.id}>
      <li>
        {t.todos} <button onClick={onClickDelete(index)}>{buttonName}</button>
      </li>
    </ul>
  ));
  return <div>{todo}</div>;
};

export default TodoList;
