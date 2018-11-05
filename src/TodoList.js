import React, { Component } from "react";
import logo from "./logo.svg";
import "./TodoList.css";

class TodoList extends Component {
  state = {
    inputItem: "",
    allList: [
      { title: "读书", isCompleted: false },
      { title: "看电影", isCompleted: false }
    ],
    activingList: [],
    completedList: [],
    searchKeyword: ""
  };
  handleInputItem = e => {
    console.log(e.target);
    this.setState({
      inputItem: e.target.value
    });
    console.log("输入项：" + this.state.inputItem);
  };
  handleSearch = e => {
    this.setState({
      searchKeyword: e.target.value
    });
    console.log("输入项：" + this.state.searchKeyword);
  };
  handleComplete = (e, index) => {
    console.log(e.target);
    let tmpData = this.state.allList.concat([]);
    console.log(tmpData);
    console.log(index);
    tmpData[index].isCompleted = e.target.value;
    this.setState({
      allList: tmpData
    });
  };
  handleDelete = index => {
    let tmpData = this.state.allList.concat([]);
    console.log(tmpData);
    console.log(index);
    tmpData.splice(index, 1);
    this.setState({
      allList: tmpData
    });
  };
  addItem = () => {
    let tmpItem = { title: this.state.inputItem, isCompleted: false };
    this.setState({
      allList: this.state.allList.concat(tmpItem)
    });
  };
  searchItems = () => {
    console.log("搜索关键字：" + this.state.searchKeyword);
  };
  render() {
    return (
      <div className="todoList">
        <input
          type="text"
          name="todo"
          value={this.state.inputItem}
          onChange={this.handleInputItem}
          placeholder="输入待办项"
        />
        <span onClick={this.addItem}>添加</span>
        <input
          type="text"
          name="search"
          value={this.state.searchKeyword}
          onChange={this.handleSearch}
          placeholder="输入查询关键字"
        />
        <span onClick={this.searchItems}>查询</span>
        <div className="tabs">
          <span>全部</span>
          <span>未完成</span>
          <span>已完成</span>
        </div>
        <div className="list-all">
          {this.state.allList.map((item, index) => (
            <div key={index} className={item.isCompleted ? "completed" : ""}>
              <input
                type="checkbox"
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
          ))}
        </div>

        <div className="list-activing" />

        <div className="list-completed" />
      </div>
    );
  }
}

export default TodoList;
