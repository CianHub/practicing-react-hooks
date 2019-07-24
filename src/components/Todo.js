import React, { useState, useEffect } from "react";
import axios from "axios";

const todo = props => {
  const [todoName, setTodoName] = useState("");
  const [todoList, setToDoList] = useState([]);

  //const [todoState, setTodoState] = useState({ inputValue: "", todoList: [] });

  const inputChangeHandler = event => setTodoName(event.target.value);

  useEffect(() => {
    axios
      .get("https://react-hooks-project-c35c1.firebaseio.com/todos.json")
      .then(res => {
        const todos = [];
        for (const key in res.data) {
          todos.push({ id: key, name: res.data[key].name });
        }
        setToDoList(todos);
        console.log(res.data);
      });
  }, []);

  const todoAddHandler = () => {
    setToDoList(todoList.concat(todoName));
    axios
      .post("https://react-hooks-project-c35c1.firebaseio.com/todos.json", {
        name: todoName
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
        value={todoName}
      />
      <button type="button" onClick={todoAddHandler}>
        Add
      </button>
      <ul>
        {todoList.map(todo => (
          <li key={todo.id}>{todo.name}</li>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default todo;
