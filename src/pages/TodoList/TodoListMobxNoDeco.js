import React, { Component } from "react";
import "./TodoList.css";
import { decorate, observable, action, reaction } from "mobx";
import { observer } from "mobx-react";

class TodoListMobxNoDeco extends Component {
  inputItem = "";
  listFlag = "all";
  allList = [];

  handleInputItem = e => {
    console.log(e.target);
    this.inputItem = e.target.value;
    console.log(this.inputItem);
  };

  handleItemToggle = (e, index) => {
    e.persist();
    this.allList[index].isCompleted = e.target.checked;
  };

  handleListChg = listFlag => {
    this.listFlag = listFlag;
  };

  handleItemDelete = index => {
    this.allList.splice(index, 1);
  };

  handleAddItem = event => {
    if (event.keyCode !== 13) {
      return;
    }
    if (!this.inputItem) {
      return;
    }
    let tmpItem = { title: this.inputItem, isCompleted: false };
    this.allList.push(tmpItem);
    this.inputItem = "";
  };

  handleClearCompleted = () => {
    this.allList.forEach((item, index) => {
      item.isCompleted && this.allList.splice(index, 1);
    });
  };

  render() {
    return (
      <div className="todoList">
        <div className="todoapp">
          <div>
            <div className="header">
              <h1>todos</h1>
              <input
                id="toggle-all"
                className="toggle-all"
                type="checkbox"
                checked=""
                data-reactid=".0.1.0"
              />
              <label htmlFor="toggle-all" />
              <input
                className="new-todo"
                placeholder="What needs to be done?"
                value={this.inputItem}
                onChange={this.handleInputItem}
                onKeyDown={this.handleAddItem}
                autoFocus={true}
              />
            </div>
            <div className="main">
              <ul className="todo-list">
                {this.allList.map((item, index) => {
                  const LiClass =
                    (item.isCompleted ? "completed" : "") +
                    " " +
                    (item.isEdit ? "editing" : "");

                  return (
                    (this.listFlag === "all" ||
                      (this.listFlag === "activing" && !item.isCompleted) ||
                      (this.listFlag === "completed" && item.isCompleted)) && (
                      <li
                        className={LiClass}
                        key={index}
                        onDoubleClick={() => {
                          item.isEdit = true;
                        }}
                      >
                        <div className="view">
                          <input
                            className="toggle"
                            type="checkbox"
                            checked={item.isCompleted}
                            onChange={e => {
                              item.isCompleted = !item.isCompleted;
                            }}
                          />
                          <label>{item.title}</label>
                          <button
                            className="destroy"
                            onClick={e => {
                              this.handleItemDelete(index);
                            }}
                          />
                        </div>
                        <input
                          className="edit"
                          value={item.title}
                          onChange={e => {
                            item.title = e.target.value;
                          }}
                          onBlur={e => {
                            item.isEdit = false;
                          }}
                        />
                      </li>
                    )
                  );
                })}
              </ul>
            </div>
            <footer className="footer">
              <span className="todo-count">
                <strong>
                  {this.allList.filter(item => !item.isCompleted).length}
                </strong>
                <span> </span>
                <span>items</span>
                <span> left</span>
              </span>
              <ul className="filters">
                <li>
                  <a
                    href="#/"
                    onClick={() => {
                      this.listFlag = "all";
                    }}
                    className={this.listFlag === "all" ? "selected" : ""}
                  >
                    All
                  </a>
                </li>
                <span> </span>
                <li>
                  <a
                    href="#/active"
                    onClick={() => {
                      this.listFlag = "activing";
                    }}
                    className={this.listFlag === "activing" ? "selected" : ""}
                  >
                    Active
                  </a>
                </li>
                <span> </span>
                <li>
                  <a
                    href="#/completed"
                    onClick={() => {
                      this.listFlag = "completed";
                    }}
                    className={this.listFlag === "completed" ? "selected" : ""}
                  >
                    Completed
                  </a>
                </li>
              </ul>
              <button
                className="clear-completed"
                onClick={this.handleClearCompleted}
              >
                Clear completed
              </button>
            </footer>
          </div>
        </div>
        <footer className="info">
          <p>Double-click to edit a todo</p>
          <p>
            Created by <a href="http://github.com/petehunt/">petehunt</a>
          </p>
          <p>
            Part of <a href="http://todomvc.com">TodoMVC</a>
          </p>
        </footer>
      </div>
    );
  }
}
decorate(TodoListMobxNoDeco, {
  inputItem: observable,
  allList: observable,
  listFlag: observable,
  handleAddItem: action,
  handleClearCompleted: action,
  handleInputItem: action,
  handleItemDelete: action,
  handleItemToggle: action,
  handleListChg: action
});

TodoListMobxNoDeco = observer(TodoListMobxNoDeco);

export default TodoListMobxNoDeco;
