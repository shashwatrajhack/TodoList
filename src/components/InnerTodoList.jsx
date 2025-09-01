import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useTodos } from "../context/TodoContext";
import InnerTodoItem from "./InnerTodoItem";
import Pagination from "./Pagination";

const InnerTodoList = () => {
  const { id } = useParams();
  const { todos, addInnerTodo } = useTodos();
  const todo = todos.find(t => String(t.id) === id);
  const [input, setInput] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  if (!todo) return <p>Todo not found</p>;

  const handleAdd = () => {
    if (input.trim()) {
      addInnerTodo(todo.id, input.trim());
      setInput("");
    }
  };

  const startIdx = (page - 1) * perPage;
  const paginated = todo.items.slice(startIdx, startIdx + perPage);

  return (
    <div className="container">
      <h2>{todo.title} - Inner Todos</h2>
      <div className="input-section">
        <input value={input} onChange={e => setInput(e.target.value)} placeholder="Add inner todo..." />
        <button onClick={handleAdd}>Add</button>
      </div>
      <div className="list">
        {paginated.map((item,i) => <InnerTodoItem key={item.id} parentId={todo.id} item={item}  idx={i} last={i!==paginated.length - 1}  />)}
      </div>
      <Pagination total={todo.items.length} page={page} setPage={setPage} perPage={perPage} setPerPage={setPerPage} />
    </div>
  );
};

export default InnerTodoList;
