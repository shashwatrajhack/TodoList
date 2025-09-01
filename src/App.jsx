import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TodoProvider } from "./context/TodoContext";
import TodoList from "./components/TodoList";
import InnerTodoList from "./components/InnerTodoList";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <BrowserRouter>
      <TodoProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<TodoList />} />
          <Route path="/list/:id" element={<InnerTodoList />} />
        </Routes>
      </TodoProvider>
    </BrowserRouter>
  );
};

export default App;
