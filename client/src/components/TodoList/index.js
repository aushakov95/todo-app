import React from "react";
import TodoItem from "../TodoItem";
import styles from "./TodoList.module.css";

const TodoList = (props) => {
  const todos = props.todos.map((todo) => (
    <TodoItem
      key={todo.id}
      id={todo.id}
      task={todo.task}
      isCompleted={todo.isCompleted}
      getAllTodos={props.getAllTodos}
      deleteTodo={props.deleteTodo}
    />
  ));

  return <div className={styles.todolistcontainer}>{todos}</div>;
};

export default TodoList;
