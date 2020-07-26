import React, { useState } from "react";

const TodoItem = (props) => {
  const [state, setState] = useState({
    isCompleted: props.isCompleted,
    isBeingEdited: false,
    task: props.task,
  });

  const handleCheckboxClick = () => {
    setState({ ...state, isCompleted: !state.isCompleted });
  };

  const handleDoubleClick = (event) => {
    setState({ ...state, isBeingEdited: true });
    event.currentTarget.focus();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setState({ ...state, isBeingEdited: false });
    const res = await fetch(`http://localhost:9000/todos/${props.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task: state.task,
        isCompleted: state.isCompleted,
      }),
    });
    await props.getAllTodos();
  };

  if (state.isBeingEdited) {
    return (
      <div>
        <input
          type="checkbox"
          id={props.id}
          name={props.task}
          checked={state.isCompleted}
          onClick={handleCheckboxClick}
        />
        <input
          autoFocus
          type="text"
          value={state.task}
          onChange={(event) => {
            setState({ ...state, task: event.target.value });
          }}
          onBlur={handleSubmit}
        />
      </div>
    );
  }
  return (
    <div>
      <input
        type="checkbox"
        id={props.id}
        name={props.task}
        checked={state.isCompleted}
        onClick={handleCheckboxClick}
      />
      <p for={props.id} onDoubleClick={handleDoubleClick}>
        {state.task}
      </p>
    </div>
  );
};

export default TodoItem;
