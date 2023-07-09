import type { LinksFunction } from "@remix-run/node";
import type { Todos } from "front-end/app/models/todo.server";

import styles from "front-end/app/styles/todo.css";

export type ListProps = {
  todoList: Todos[];
};

export const todoListlinks: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

const TodoList: React.FC<ListProps> = ({ todoList }) => {
  const todo = todoList.map((t) => (
    <ul key={t.id}>
      <li>
        {t.todos} <button>削除</button>
      </li>
    </ul>
  ));
  return <div>{todo}</div>;
};

export default TodoList;
