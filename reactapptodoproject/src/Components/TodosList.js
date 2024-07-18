import React from "react";
const TodosList = ({ todos, setTodos, setEditTodo, onLogout }) => {
  const handleEdit = ({ id }) => {
    const findTodo = todos.find((todo) => todo.id === id);
    setEditTodo(findTodo);
  };
  const handleDelete = ({ id }) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  const handleComplete = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    );
  };
  const completedTasks = todos.filter((todo) => todo.completed).length;
  const totalTasks = todos.length;

  return (
    <div>
      <ul>
        {todos.map((todo) => (
          <li className="list-item" key={todo.id}>
            <input
              type="text"
              value={todo.title}
              className={'list ${todo.completed ? "complete" : ""}'}
              onChange={(event) => event.preventDefault()}
            />
            <input
              type="checkbox"
              className="large-checkbox"
              checked={todo.completed}
              onChange={() => handleComplete(todo.id)}
            />

            <div>
              <button
                className="button-edit task-button"
                onClick={() => handleEdit(todo)}
              >
                <i className="fa fa-edit"></i>
              </button>
              <button
                className="button-delete task-button"
                onClick={() => handleDelete(todo)}
              >
                <i className="fa fa-trash"></i>
              </button>
            </div>
          </li>
        ))}
      </ul>
      <p>
        Completed Tasks:{completedTasks}/{totalTasks}
      </p>
      <button className="button-logout" onClick={onLogout}>
        Back To Login Page
      </button>
    </div>
  );
};
export default TodosList;
