import type { LinksFunction } from "@remix-run/node";
import type { Todos } from "frontend/app/models/todo.server";

import styles from "frontend/app/styles/todo.css";
import { useState, type MouseEventHandler } from "react";

export type ListProps = {
  todoList: Todos[];
  onClickDelete: (
    index: number
  ) => MouseEventHandler<HTMLButtonElement> | undefined;
  onClickUpdate: (index: number, editedValue: string) => void;
  buttonName?: string;
};

export const todoListlinks: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

const TodoList: React.FC<ListProps> = ({
  todoList,
  onClickDelete,
  onClickUpdate,
}) => {
  // 編集内容を保存するための一時的な状態
  const [editedContent, setEditedContent] = useState<string[]>([]);

  const handleContentEdit = (index: number, value: string) => {
    const updatedContent = [...editedContent];
    updatedContent[index] = value;
    setEditedContent(updatedContent);
  };
  const todo = todoList.map((t, index) => (
    <ul key={t.newId}>
      <li>
        <a
          contentEditable="true"
          onBlur={(e) =>
            handleContentEdit(index, e.currentTarget.textContent || "")
          }
        >
          {t.todos}
        </a>
        <div className="button-group">
          <button
            className="update-button"
            onClick={() =>
              onClickUpdate(index, editedContent[index] || t.todos)
            }
          >
            更新
          </button>
          <button className="delete-button" onClick={onClickDelete(index)}>
            削除
          </button>
        </div>
      </li>
    </ul>
  ));
  return <>{todo}</>;
};

export default TodoList;
