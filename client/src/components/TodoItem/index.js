import React, { useState, useContext } from "react";
import UserContext from "../User";
import styles from "./TodoItem.module.css";

const TodoItem = (props) => {
  const [state, setState] = useState({
    isCompleted: props.isCompleted,
    isBeingEdited: false,
    task: props.task,
  });

  const user = useContext(UserContext);

  const updateTodo = async (newTodo) => {
    const res = await fetch(
      `https://todo-app-by-andrei-api.herokuapp.com/users/${user.uid}/todos/${props.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      }
    );
    await props.getAllTodos();
  };

  const handleCheckboxClick = async () => {
    const newValue = !state.isCompleted;
    setState({ ...state, isCompleted: newValue });
    /* 
        Cannot rely on setState to finish before calling updateTodo
        therefore we are using the flipped version of current value of the
        checkbox when calling updateTodo. 
    */
    await updateTodo({ task: state.task, isCompleted: newValue });
  };

  const handleDoubleClick = (event) => {
    setState({ ...state, isBeingEdited: true });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setState({ ...state, isBeingEdited: false });
    if (state.task.length <= 0) {
      props.deleteTodo(props.id);
    } else {
      await updateTodo({ task: state.task, isCompleted: state.isCompleted });
    }
  };

  if (state.isBeingEdited) {
    return (
      <div className={styles.todoitem}>
        <input
          type="checkbox"
          id={props.id}
          name={props.task}
          checked={state.isCompleted}
          onClick={handleCheckboxClick}
          className={styles.checkbox}
        />
        <input
          autoFocus
          type="text"
          value={state.task}
          onChange={(event) => {
            setState({ ...state, task: event.target.value });
          }}
          onBlur={handleSubmit}
          className={styles.editTaskField}
        />
      </div>
    );
  }
  return (
    <div className={styles.todoitem}>
      <input
        type="checkbox"
        id={props.id}
        name={props.task}
        checked={state.isCompleted}
        onClick={handleCheckboxClick}
        className={styles.checkbox}
      />
      <p className={styles.task} onDoubleClick={handleDoubleClick}>
        {state.task}
      </p>
      <div className={styles.deleteContainer}>
        <p className={styles.delete} onClick={() => props.deleteTodo(props.id)}>
          ×
        </p>
      </div>
    </div>
  );
};

export default TodoItem;
