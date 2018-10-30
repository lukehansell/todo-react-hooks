import React, { useState, useContext } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

const useTodos = () => {
  let id = 0;

  const [todos, setTodos] = useState([]);

  const addTodo = text => {
    setTodos(todos => {
      return [
        ...todos,
        {
          id: id++,
          text,
          complete: false
        }
      ];
    });
  };

  const removeTodo = id => {
    setTodos(todos => todos.filter(todo => todo.id === id));
  };

  const toggleTodoComplete = id => {
    setTodos(() =>
      todos.map(todo => {
        if (todo.id !== id) return todo;
        return {
          ...todo,
          complete: !todo.complete
        };
      })
    );
  };

  return {
    todos,
    addTodo,
    removeTodo,
    toggleTodoComplete
  };
};

const TodoList = ({ todos }) => (
  <ul>{todos.map(todo => <li>{todo.text}</li>)}</ul>
);

const TodoInput = ({ addTodo }) => {
  const [text, setText] = useState("");

  const submitTodo = () => {
    addTodo(text);
    setText("");
  };

  return (
    <React.Fragment>
      <input type="text" onChange={e => setText(e.target.value)} value={text} />
      <button onClick={submitTodo}>Add Todo</button>
    </React.Fragment>
  );
};

function App() {
  const { todos, addTodo } = useTodos();
  return (
    <div className="App">
      <h1>Todo List</h1>
      <TodoList todos={todos} />
      <TodoInput addTodo={addTodo} />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
