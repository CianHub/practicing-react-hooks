import React from "react";

const list = props => {
  console.log("rendering list");
  return (
    <ul>
      {props.todoList.map(todo => (
        <li key={todo.id} onClick={props.todoRemoveHandler.bind(this, todo.id)}>
          {todo.name}
        </li>
      ))}
    </ul>
  );
};

export default list;
