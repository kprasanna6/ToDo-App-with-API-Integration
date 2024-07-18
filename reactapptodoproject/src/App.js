import React, { useState, useEffect } from "react";
import Header from "./Components/Header";
import Form from "./Components/Form";
import TodosList from "./Components/TodosList";
import Login from "./Components/Login";
import "./styles.css";

const App = () => {
  const initialState = JSON.parse(localStorage.getItem("todos")) ?? "[]";
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState(
    initialState.map((todo) => ({
      ...todo,
      completed: todo.completed || false,
    }))
  );
  const [editTodo, setEditTodo] = useState(null);
  const [authenticated, setAuthenticated] = useState(
    localStorage.getItem("authenticated") === "true"
  );

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleLogout = () => {
    setAuthenticated(false);
    localStorage.removeItem("authenticated");
  };

  return (
    <div className="container">
      <div className="app-wrapper">
        {authenticated ? (
          <>
            <div>
              <Header onLogout={handleLogout} />
            </div>
            <div>
              <Form
                input={input}
                setInput={setInput}
                todos={todos}
                setTodos={setTodos}
                editTodo={editTodo}
                setEditTodo={setEditTodo}
              />
            </div>
            <div>
              <TodosList
                todos={todos}
                setTodos={setTodos}
                setEditTodo={setEditTodo}
                onLogout={handleLogout}
              />
            </div>
          </>
        ) : (
          <Login setAuthenticated={setAuthenticated} />
        )}
      </div>
    </div>
  );
};

export default App;
