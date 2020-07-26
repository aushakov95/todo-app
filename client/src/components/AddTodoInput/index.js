import React, { useState } from "react";

const AddTodoInput = (props) => {
  const [state, setState] = useState({
    task: "",
  });

  const createTodo = async (event) => {
    event.preventDefault();
    console.log(state.task);
    const res = await fetch("http://localhost:9000/todos", {
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
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTodoInput;
