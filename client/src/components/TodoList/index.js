import React from "react";
import TodoItem from "../TodoItem";

const TodoList = (props) => {
  const todos = props.todos.map((todo) => (
    <li>
      <TodoItem
        key={todo.id}
        id={todo.id}
        task={todo.task}
        isCompleted={todo.isCompleted}
        getAllTodos={props.getAllTodos}
      />
      <button onClick={() => props.deleteTodo(todo.id)}>Delete</button>
    </li>
  ));

  return (
    <div>
      <ul>{todos}</ul>
    </div>
  );
};

export default TodoList;
