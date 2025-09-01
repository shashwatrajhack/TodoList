import React, { useState } from "react";
import { useTodos } from "../context/TodoContext";
import TodoItem from "./TodoItem";
import Pagination from "./Pagination";

const TodoList = () => {
  const { todos, addTodo } = useTodos();
  const [input, setInput] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const handleAdd = () => {
    if (input.trim()) {
      addTodo(input.trim());
      setInput("");
    }
  };

  const startIdx = (page - 1) * perPage;
  const paginated = todos.slice(startIdx, startIdx + perPage);

  return (
    <div className="container">
      <h2>Main Todos</h2>
      <div className="input-section">
        <input value={input} onChange={e => setInput(e.target.value)} placeholder="Add todo..." />
        <button onClick={handleAdd}>Add</button>
      </div>
      <div className="list">
        {paginated.map((todo,i) => <TodoItem key={todo.id} todo={todo} idx={i} last={i!==paginated.length - 1} />)}
      </div>
      <Pagination total={todos.length} page={page} setPage={setPage} perPage={perPage} setPerPage={setPerPage} />
    </div>
  );
};

export default TodoList;
