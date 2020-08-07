import React, { useState, useContext } from "react";
import UserContext from "../User";
import styles from "./AddTodoInput.module.css";

const AddTodoInput = (props) => {
  const [state, setState] = useState({
    task: "",
  });
  const user = useContext(UserContext);

  const createTodo = async (event) => {
    event.preventDefault();
    console.log(state.task);
    const res = await fetch(`http://localhost:9000/users/${user.uid}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task: state.task }),
    });
    setState({ task: "" });
    await props.getAllTodos();
  };

  return (
    <form onSubmit={createTodo}>
      <input
        type="text"
        value={state.task}
        placeholder="Add something else todo"
        onChange={(event) => {
          setState({ task: event.target.value });
        }}
        className={styles.inputfield}
      />
    </form>
  );
};

export default AddTodoInput;
