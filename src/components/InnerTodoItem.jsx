import React, { useState } from "react";
import { useTodos } from "../context/TodoContext";

const InnerTodoItem = ({ parentId, item, idx, last }) => {
  const { editInnerTodo, toggleInnerTodo, deleteInnerTodo, moveInnerTodo } =
    useTodos();
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(item.title);

  const saveEdit = () => {
    editInnerTodo(parentId, item.id, text);
    setEditing(false);
  };

  return (
    <div className="item">
      <input
        type="checkbox"
        checked={item.done}
        onChange={() => toggleInnerTodo(parentId, item.id)}
      />
      {editing ? (
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={saveEdit}
          autoFocus
        />
      ) : (
        <span className={item.done ? "done" : ""}>{item.title}</span>
      )}
      <div className="actions">
        <button onClick={() => setEditing(!editing)}>✏️</button>
        {!!idx && (
          <button onClick={() => moveInnerTodo(parentId, item.id, "up")}>
            ⬆️
          </button>
        )}
        {!!last && (
          <button onClick={() => moveInnerTodo(parentId, item.id, "down")}>
            ⬇️
          </button>
        )}
        <button onClick={() => deleteInnerTodo(parentId, item.id)}>🗑️</button>
      </div>
    </div>
  );
};

export default InnerTodoItem;
