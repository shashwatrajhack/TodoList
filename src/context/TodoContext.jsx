import React, { createContext, useContext, useEffect, useState } from "react";

const TodoContext = createContext();
export const useTodos = () => useContext(TodoContext);

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title) => {
    setTodos([...todos, { id: Date.now(), title, done: false, items: [] }]);
  };

  const editTodo = (id, newTitle) => {
    setTodos(todos.map(t => t.id === id ? { ...t, title: newTitle } : t));
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  const moveTodo = (id, direction) => {
    const idx = todos.findIndex(t => t.id === id);
    if (idx < 0) return;
    const newTodos = [...todos];
    const targetIdx = direction === "up" ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= todos.length) return;
    [newTodos[idx], newTodos[targetIdx]] = [newTodos[targetIdx], newTodos[idx]];
    setTodos(newTodos);
  };

  const addInnerTodo = (parentId, title) => {
    setTodos(todos.map(t => 
      t.id === parentId ? { ...t, items: [...t.items, { id: Date.now(), title, done: false }] } : t
    ));
  };

  const editInnerTodo = (parentId, itemId, newTitle) => {
    setTodos(todos.map(t =>
      t.id === parentId ? {
        ...t,
        items: t.items.map(i => i.id === itemId ? { ...i, title: newTitle } : i)
      } : t
    ));
  };

  const toggleInnerTodo = (parentId, itemId) => {
    setTodos(todos.map(t =>
      t.id === parentId ? {
        ...t,
        items: t.items.map(i => i.id === itemId ? { ...i, done: !i.done } : i)
      } : t
    ));
  };

  const deleteInnerTodo = (parentId, itemId) => {
    setTodos(todos.map(t =>
      t.id === parentId ? { ...t, items: t.items.filter(i => i.id !== itemId) } : t
    ));
  };

  const moveInnerTodo = (parentId, itemId, direction) => {
    setTodos(todos.map(t => {
      if (t.id !== parentId) return t;
      const idx = t.items.findIndex(i => i.id === itemId);
      if (idx < 0) return t;
      const targetIdx = direction === "up" ? idx - 1 : idx + 1;
      if (targetIdx < 0 || targetIdx >= t.items.length) return t;
      const newItems = [...t.items];
      [newItems[idx], newItems[targetIdx]] = [newItems[targetIdx], newItems[idx]];
      return { ...t, items: newItems };
    }));
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, editTodo, toggleTodo, deleteTodo, moveTodo, addInnerTodo, editInnerTodo, toggleInnerTodo, deleteInnerTodo, moveInnerTodo }}>
      {children}
    </TodoContext.Provider>
  );
};
