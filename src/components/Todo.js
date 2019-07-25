import React, { useState, useEffect, useReducer, useRef } from "react";
import axios from "axios";

const todo = props => {
  //const [todoName, setTodoName] = useState("");
  // const [submittedTodo, setSubmittedTodo] = useState(null);
  //const [todoList, setToDoList] = useState([]);
  const todoInputRef = useRef();

  //const [todoState, setTodoState] = useState({ inputValue: "", todoList: [] });
  const todoListReducer = (state, action) => {
    switch (action.type) {
      case "ADD":
        return state.concat(action.payload);
      case "SET":
        return action.payload;
      case "REMOVE":
        return state.filter(todo => todo.id !== action.payload);
      default:
        return state;
    }
  };

  const [todoList, dispatch] = useReducer(todoListReducer, []);

  const inputChangeHandler = event => null; //setTodoName(event.target.value);

  useEffect(() => {
    axios
      .get("https://react-hooks-project-c35c1.firebaseio.com/todos.json")
      .then(res => {
        const todos = [];
        for (const key in res.data) {
          todos.push({ id: key, name: res.data[key].name });
        }
        dispatch({ type: "SET", payload: todos });
      });
    return () => {};
  }, []);

  const mouseMoveHandler = event => {};

  useEffect(() => {
    document.addEventListener("mousemove", mouseMoveHandler);
    return () => {
      document.removeEventListener("mousemove", mouseMoveHandler);
    };
  }, []);

  const todoAddHandler = () => {
    const todoName = todoInputRef.current.value;

    axios
      .post("https://react-hooks-project-c35c1.firebaseio.com/todos.json", {
        name: todoName
      })
      .then(res => {
        setTimeout(() => {
          const todoItem = { id: res.data.name, name: todoName };
          dispatch({ type: "ADD", payload: todoItem });
        }, 1);
      })
      .catch(err => console.log(err));
  };

  const todoRemoveHandler = id => {
    axios
      .delete(
        `https://react-hooks-project-c35c1.firebaseio.com/todos/${id}.json`
      )
      .then(res => dispatch({ type: "REMOVE", payload: id }))
      .catch(err => console.log(err));
  };

  console.log(todoList);
  return (
    <React.Fragment>
      <input
        type="text"
        placeholder="Todo"
        //onChange={inputChangeHandler}
        //value={todoName}
        ref={todoInputRef}
      />
      <button type="button" onClick={todoAddHandler.bind(this)}>
        Add
      </button>
      <ul>
        {todoList.map(todo => (
          <li key={todo.id} onClick={todoRemoveHandler.bind(this, todo.id)}>
            {todo.name}
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default todo;
