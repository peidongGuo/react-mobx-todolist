import React, { Component } from "react";
import "./TodoList.css";
import { decorate, observable, action, reaction } from "mobx";
import { observer } from "mobx-react";

@observer
class TodoListMobx extends Component {
  @observable inputItem = "";
  @observable listFlag = "all";
  @observable searchKeyword = "";
  @observable allList = [];
  @action
  handleInputItem = e => {
    console.log(e.target);
    this.inputItem = e.target.value;
    console.log(this.inputItem);
  };
  @action
  handleSearch = e => {
    this.searchKeyword = e.target.value;
    console.log("输入项：" + this.searchKeyword);
  };
  @action
  handleComplete = (e, index) => {
    e.persist();
    this.allList[index].isCompleted = e.target.checked;
  };
  @action
  handleToggle = (e, index) => {
    e.persist();
    this.allList[index].isCompleted = e.target.checked;
  };
  @action
  handleChg = listFlag => {
    this.listFlag = listFlag;
  };
  @action
  handleDelete = index => {
    this.allList.splice(index, 1);
  };
  // @action
  addItem = event => {
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
  @action
  searchItems = () => {
    console.log("搜索关键字：" + this.searchKeyword);
  };

  @action
  clearCompleted = () => {
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
                class="toggle-all"
                type="checkbox"
                checked=""
                data-reactid=".0.1.0"
              />
              <label for="toggle-all" />
              <input
                className="new-todo"
                placeholder="What needs to be done?"
                value={this.inputItem}
                onChange={this.handleInputItem}
                onKeyDown={this.addItem}
                autoFocus={true}
              />
            </div>
            <div className="main">
              <ul className="todo-list">
                {this.allList.map((item, index) => {
                  return (
                    (this.listFlag === "all" ||
                      (this.listFlag === "activing" && !item.isCompleted) ||
                      (this.listFlag === "completed" && item.isCompleted)) &&
                    (!this.searchKeyword ||
                      item.title.indexOf(this.searchKeyword) > -1) && (
                      <li
                        className={item.isCompleted ? "completed" : ""}
                        key={index}
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
                          <button className="destroy" />
                        </div>
                        <input
                          className="edit"
                          value="{item}"
                          onChange={this.handleChg}
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
              <button className="clear-completed" onClick={this.clearCompleted}>
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

export default TodoListMobx;
