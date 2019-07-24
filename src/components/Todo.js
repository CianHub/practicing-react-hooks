import React, { useState } from "react";
import axios from "axios";

const todo = props => {
  //const [inputValue, updateValue] = useState("");
  //const [todoList, updateTodoList] = useState([]);

  const [todoState, setTodoState] = useState({ inputValue: "", todoList: [] });

  const inputChangeHandler = event => {
    setTodoState({
      inputValue: event.target.value,
      todoList: todoState.todoList
    });
  };

  const todoAddHandler = () => {
    setTodoState({
      inputValue: todoState.inputValue,
      todoList: todoState.todoList.concat(todoState.inputValue)
    });
    axios
      .post("https://react-hooks-project-c35c1.firebaseio.com/todos.json", {
        name: todoState.inputValue
      })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  return (
    <React.Fragment>
      <input
        type="text"
        placeholder="Todo"
        onChange={inputChangeHandler}
        value={todoState.inputValue}
      />
      <button type="button" onClick={todoAddHandler}>
        Add
      </button>
      <ul>
        {todoState.todoList.map(todo => (
          <li key={todo}>{todo}</li>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default todo;
