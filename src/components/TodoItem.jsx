import React, { useState } from "react";
import { useTodos } from "../context/TodoContext";
import { Link } from "react-router-dom";

const TodoItem = ({ todo,idx,last }) => {
  const { editTodo, toggleTodo, deleteTodo, moveTodo } = useTodos();
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(todo.title);

  const saveEdit = () => {
    editTodo(todo.id, text);
    setEditing(false);
  };

  return (
    <div className="item">
      <input type="checkbox" checked={todo.done} onChange={() => toggleTodo(todo.id)} />
      {editing ? (
        <input value={text} onChange={e => setText(e.target.value)} onBlur={saveEdit} autoFocus />
      ) : (
        <Link to={`/list/${todo.id}`} className={todo.done ? "done" : ""}>
          {todo.title}
        </Link>
      )}
      <div className="actions">
        <button onClick={() => setEditing(!editing)}>✏️</button>
        {!!idx && <button onClick={() => moveTodo(todo.id, "up")}>⬆️</button>}
        {!!last && <button onClick={() => moveTodo(todo.id, "down")}>⬇️</button>}
        <button onClick={() => deleteTodo(todo.id)}>🗑️</button>
      </div>
    </div>
  );
};

export default TodoItem;
