import React, { Component } from "react";
import logo from "./logo.svg";
import "./TodoList.css";
import { observable, action, reaction } from "mobx";
import { observer } from "mobx-react";

@observer
class Todo extends Component {
  @action
  handleDelete = index => {
    this.props.store.allList.splice(this.props.index, 1);
  };

  render() {
    const { index, item } = this.props;
    return (
      <div key={index} className={item.isCompleted ? "completed" : ""}>
        <input
          type="checkbox"
          defaultChecked={item.isCompleted}
          onChange={e => {
            item.isCompleted = !item.isCompleted;
          }}
        />
        {item.title}
        <span className="btn-delete" onClick={() => this.handleDelete(index)}>
          删除
        </span>
      </div>
    );
  }
}

export default Todo;
