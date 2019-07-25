import React, { useState, useEffect, useReducer, useRef, useMemo } from "react";
import axios from "axios";
import List from "./list";
import { useFormInput } from "../hooks/forms";

const todo = props => {
  const [inputIsValid, setInputIsValid] = useState(false);
  //const [todoName, setTodoName] = useState("");
  // const [submittedTodo, setSubmittedTodo] = useState(null);
  //const [todoList, setToDoList] = useState([]);
  //const todoInputRef = useRef();
  const todoInput = useFormInput();

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
    const todoName = todoInput.value;

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

  const inputValidationHandler = event => {
    if (event.target.value.trim() === "") {
      setInputIsValid(false);
    } else {
      setInputIsValid(true);
    }
  };

  console.log(todoList);
  return (
    <React.Fragment>
      <input
        type="text"
        placeholder="Todo"
        onChange={todoInput.onChange}
        value={todoInput.value}
        style={{
          backgroundColor: todoInput.validity === true ? "transparent" : "red"
        }}
      />
      <button type="button" onClick={todoAddHandler.bind(this)}>
        Add
      </button>
      {useMemo(
        () => (
          <List todoList={todoList} todoRemoveHandler={todoRemoveHandler} />
        ),
        [todoList]
      )}
    </React.Fragment>
  );
};

export default todo;
