import React, { Component } from "react";
import logo from "./logo.svg";
import "./TodoList.css";
import { observable, action, reaction } from "mobx";
import { observer } from "mobx-react";

@observer
class TodoList extends Component {
  @observable inputItem = "";
  @observable listFlag = "all";
  @observable
  allList = [
    { title: "读书", isCompleted: false },
    { title: "看电影", isCompleted: false }
  ];
  @observable searchKeyword = "";

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
  handleChg = listFlag => {
    this.listFlag = listFlag;
  };
  @action
  handleDelete = index => {
    this.allList.splice(index, 1);
  };
  @action
  addItem = () => {
    let tmpItem = { title: this.inputItem, isCompleted: false };
    this.allList.push(tmpItem);
  };
  @action
  searchItems = () => {
    console.log("搜索关键字：" + this.searchKeyword);
  };

  render() {
    return (
      <div className="todoList">
        <input
          type="text"
          name="todo"
          defaultValue={this.inputItem}
          onChange={this.handleInputItem}
          placeholder="输入待办项"
        />
        <span onClick={this.addItem}>添加</span>
        <input
          type="text"
          name="search"
          value={this.searchKeyword}
          onChange={this.handleSearch}
          placeholder="输入查询关键字"
        />
        <span onClick={this.searchItems}>查询</span>
        <div className="tabs">
          <span onClick={() => this.handleChg("all")}>全部</span>
          <span onClick={() => this.handleChg("activing")}>未完成</span>
          <span onClick={() => this.handleChg("completed")}>已完成</span>
        </div>
        <div className="list-all">
          {this.allList.map((item, index) => {
            return (
              (this.listFlag === "all" ||
                (this.listFlag === "activing" && !item.isCompleted) ||
                (this.listFlag === "completed" && item.isCompleted)) &&
              (!this.searchKeyword ||
                item.title.indexOf(this.searchKeyword) > -1) && (
                <div
                  key={index}
                  className={item.isCompleted ? "completed" : ""}
                >
                  <input
                    type="checkbox"
                    defaultChecked={item.isCompleted}
                    onChange={e => {
                      this.handleComplete(e, index);
                    }}
                  />
                  {item.title}
                  <span
                    className="btn-delete"
                    onClick={() => this.handleDelete(index)}
                  >
                    删除
                  </span>
                </div>
              )
            );
          })}
        </div>
      </div>
    );
  }
}

export default TodoList;
