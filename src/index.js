import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import DevTools from "mobx-react-devtools";
import { Provider } from "mobx-react";
import TodoList from "./pages/TodoList/TodoList";
import TodoListMobx from "./pages/TodoList/TodoListMobx";
import TodoListMobxNoDeco from "./pages/TodoList/TodoListMobxNoDeco";

import Counter from "./pages/Demos/Counter";

ReactDOM.render(
  <div>
    {/* <TodoList />
    <TodoListMobx />
    <TodoListMobxNoDeco /> */}
    <Counter />
    <DevTools />
  </div>,
  document.getElementById("root")
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
