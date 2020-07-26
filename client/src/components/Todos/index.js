import React, { useEffect, useState } from "react";
import TodoList from "../TodoList";
import AddTodoInput from "../AddTodoInput";

const Todos = () => {
  const [state, setState] = useState({});
  const getAllTodos = async () => {
    const res = await fetch("http://localhost:9000/todos");
    const todos = await res.json();
    console.log(JSON.stringify(todos));
    setState({ todos });
  };

  const deleteTodo = async (todoId) => {
    const res = await fetch(`http://localhost:9000/todos/${todoId}`, {
      method: "DELETE",
    });
    await getAllTodos();
  };

  useEffect(() => {
    getAllTodos();
  }, []);

  if (state.todos) {
    return (
      <div>
        <h1>Todo List</h1>
        <TodoList
          todos={state.todos}
          deleteTodo={deleteTodo}
          getAllTodos={getAllTodos}
        />
        <AddTodoInput getAllTodos={getAllTodos} />
      </div>
    );
  }
  return <h1>Fetching data...</h1>;
};

export default Todos;
