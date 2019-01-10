import React, { Component } from "react";
import "./TodoList.css";

class TodoList extends Component {
  state = {
    inputItem: "",
    listFlag: "all",
    allList: []
  };

  handleInputItem = e => {
    this.setState({
      inputItem: e.target.value
    });
  };

  handleItemStatus = (e, index) => {
    e.persist();
    let items = this.state.allList;
    console.log(items, index);
    items[index].isCompleted = e.target.checked;
    this.setState({
      allList: items
    });
  };

  handleItemEdit = (index, isEdit) => {
    // e.persist();
    let items = this.state.allList;
    items[index].isEditing = !!isEdit;
    this.setState({
      allList: items
    });
  };
  handleItemTitle = (e, index) => {
    e.persist();
    let items = this.state.allList;
    console.log(items, index);
    items[index].title = e.target.value;
    this.setState({
      allList: items
    });
  };

  handleItemDelete = index => {
    let items = this.state.allList;
    items.splice(index, 1);
    this.setState({
      allList: items
    });
  };

  handleListChg = listFlag => {
    this.setState({
      listFlag: listFlag
    });
  };

  handleAddItem = event => {
    if (event.keyCode !== 13) {
      return;
    }
    if (!this.state.inputItem) {
      return;
    }
    let tmpItem = { title: this.state.inputItem, isCompleted: false };
    let items = this.state.allList;
    items.push(tmpItem);
    this.setState({
      inputItem: "",
      allList: items
    });
  };

  handleClearCompleted = () => {
    let items = this.state.allList;
    items.forEach((item, index) => {
      item.isCompleted && items.splice(index, 1);
    });
    this.setState({
      allList: items
    });
  };

  render() {
    return (
      <div className="todoList">
        <div className="todoapp">
          <div>
            <div className="header">
              <h1>todos</h1>
              <input id="toggle-all" className="toggle-all" type="checkbox" />
              <label htmlFor="toggle-all" />
              <input
                className="new-todo"
                placeholder="What needs to be done?"
                value={this.state.inputItem}
                onChange={this.handleInputItem}
                onKeyDown={this.handleAddItem}
                autoFocus={true}
              />
            </div>
            <div className="main">
              <ul className="todo-list">
                {this.state.allList.map((item, index) => {
                  return (
                    (this.state.listFlag === "all" ||
                      (this.state.listFlag === "activing" &&
                        !item.isCompleted) ||
                      (this.state.listFlag === "completed" &&
                        item.isCompleted)) && (
                      <li
                        className={item.isCompleted ? "completed" : ""}
                        className={item.isEditing ? "editing" : ""}
                        key={index}
                        onDoubleClick={() => {
                          this.handleItemEdit(index, true);
                        }}
                      >
                        <div className="view">
                          <input
                            className="toggle"
                            type="checkbox"
                            checked={item.isCompleted}
                            onChange={e => {
                              this.handleItemStatus(e, index);
                            }}
                          />
                          <label>{item.title}</label>
                          <button
                            className="destroy"
                            onClick={() => {
                              this.handleItemDelete(index);
                            }}
                          />
                        </div>
                        <input
                          className="edit"
                          value={item.title}
                          onChange={e => {
                            this.handleItemTitle(e, index);
                          }}
                          onBlur={e => {
                            this.handleItemEdit(index, false);
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
                  {this.state.allList.filter(item => !item.isCompleted).length}
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
                      this.handleListChg("all");
                    }}
                    className={this.state.listFlag === "all" ? "selected" : ""}
                  >
                    All
                  </a>
                </li>
                <span> </span>
                <li>
                  <a
                    href="#/active"
                    onClick={() => {
                      this.handleListChg("activing");
                    }}
                    className={
                      this.state.listFlag === "activing" ? "selected" : ""
                    }
                  >
                    Active
                  </a>
                </li>
                <span> </span>
                <li>
                  <a
                    href="#/completed"
                    onClick={() => {
                      this.handleListChg("completed");
                    }}
                    className={
                      this.state.listFlag === "completed" ? "selected" : ""
                    }
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

export default TodoList;
