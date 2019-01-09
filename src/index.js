import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import TodoList from "./TodoList";
import * as serviceWorker from "./serviceWorker";
import TodoStore from "./pages/Demos/TodoStore";
import DevTools from "mobx-react-devtools";
import Counter from "./pages/Demos/Counter";
const store = new TodoStore();
import context from "./pages/Demos/context";
import { Provider } from "mobx-react";
import TodoList from "./pages/TodoList/TodoList";

// const ThemeContext = context;
// console.log(ThemeContext);
// const tmpObj = { name: "gpd", age: "30" };
ReactDOM.render(
  // <ThemeContext.Provider value="dark">
  <Provider {...store}>
    <div>
      {/* <DragDemo /> */}
      {/* <Counter /> */}
      {/* <TestComponent store={store} /> */}
      {/* <TodoList store={store} /> */}
      <TodoList />
    </div>
  </Provider>,
  // </ThemeContext.Provider>,
  document.getElementById("root")
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
