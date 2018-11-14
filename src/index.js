import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import TodoList from "./TodoList";
import * as serviceWorker from "./serviceWorker";
import TestComponent from "./TestComponent";
import TestStore from "./TestStore";
// import DevTools from "mobx-react-devtools";
import Counter from "./Counter";
const store = new TestStore();
ReactDOM.render(
  <div>
    <Counter />
    <TestComponent store={store} />
    <TodoList />
  </div>,
  document.getElementById("root")
);

setTimeout(() => {
  store.chgMsg("Get a cookie as well");
}, 2000);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
