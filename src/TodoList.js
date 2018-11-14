import React, { Component } from "react";
import logo from "./logo.svg";
import "./TodoList.css";

class TodoList extends Component {
  state = {
    inputItem: "",
    listFlag: "all",
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
    e.persist();
    this.setState((prevState, props) => {
      let tmpData = prevState.allList.concat([]);
      tmpData[index].isCompleted = e.target.checked;
      return {
        allList: tmpData
      };
    });
  };
  handleChg = listFlag => {
    this.setState({
      listFlag: listFlag
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
          <span onClick={() => this.handleChg("all")}>全部</span>
          <span onClick={() => this.handleChg("activing")}>未完成</span>
          <span onClick={() => this.handleChg("completed")}>已完成</span>
        </div>
        <div className="list-all">
          {this.state.allList.map((item, index) => {
            return (
              (this.state.listFlag === "all" ||
                (this.state.listFlag === "activing" && !item.isCompleted) ||
                (this.state.listFlag === "completed" && item.isCompleted)) &&
              (!this.state.searchKeyword ||
                item.title.indexOf(this.state.searchKeyword) > -1) && (
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

        <div className="list-activing" />

        <div className="list-completed" />
      </div>
    );
  }
}

export default TodoList;
