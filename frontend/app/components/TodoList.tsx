import type { LinksFunction } from "@remix-run/node";
import type { Todos } from "frontend/app/models/todo.server";

import styles from "frontend/app/styles/todo.css";
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
    <ul key={t.newId}>
      <li>
        index:{index}:id:{t.id}:newId:{t.newId}:{t.todos}{" "}
        <button className="delete-button" onClick={onClickDelete(index)}>
          {buttonName}
        </button>
      </li>
    </ul>
  ));
  return <>{todo}</>;
};

export default TodoList;
