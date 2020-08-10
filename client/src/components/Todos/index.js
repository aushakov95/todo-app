import React, { useEffect, useState, useContext } from "react";
import TodoList from "../TodoList";
import AddTodoInput from "../AddTodoInput";
import UserContext from "../User";

const Todos = () => {
  const user = useContext(UserContext);
  const [state, setState] = useState({});
  const getAllTodos = async () => {
    const res = await fetch(
      `https://todo-app-by-andrei-api.herokuapp.com/users/${user.uid}/todos`
    );
    const todos = await res.json();
    console.log(JSON.stringify(todos));
    setState({ todos });
  };

  const deleteTodo = async (todoId) => {
    await fetch(
      `https://todo-app-by-andrei-api.herokuapp.com/users/${user.uid}/todos/${todoId}`,
      {
        method: "DELETE",
      }
    );
    await getAllTodos();
  };

  useEffect(() => {
    getAllTodos();
  }, []);

  if (state.todos) {
    return (
      <div>
        <h1>To-do List</h1>
        <AddTodoInput getAllTodos={getAllTodos} />
        <TodoList
          todos={state.todos}
          deleteTodo={deleteTodo}
          getAllTodos={getAllTodos}
        />
      </div>
    );
  }
  return <h1>Fetching data...</h1>;
};

export default Todos;
