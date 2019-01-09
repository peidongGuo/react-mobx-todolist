import React, { Component } from "react";
import "./TodoList.css";
import { decorate, observable, action, reaction } from "mobx";
import { observer } from "mobx-react";
import Todo from "./Todo";
@observer
class TodoList extends Component {
  // @observable inputItem = "";
  // decorate(inputItem,"");
  // @observable listFlag = "all";
  @observable searchKeyword = "";
  listFlag = observable.box("all");

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
    this.props.store.allList[index].isCompleted = e.target.checked;
  };
  @action
  handleChg = listFlag => {
    this.listFlag.set(listFlag);
  };
  @action
  handleDelete = index => {
    this.props.store.allList.splice(index, 1);
  };
  // @action
  addItem = () => {
    if (!this.inputItem) {
      return;
    }
    let tmpItem = { title: this.inputItem, isCompleted: false };
    this.props.store.allList.push(tmpItem);
  };
  @action
  searchItems = () => {
    console.log("搜索关键字：" + this.searchKeyword);
  };

  render() {
    const {
      allList,
      allCount,
      activingCount,
      completedCount
    } = this.props.store;
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
          <span onClick={() => this.handleChg("all")}>全部-{allCount}</span>
          <span onClick={() => this.handleChg("activing")}>
            未完成-{activingCount}
          </span>
          <span onClick={() => this.handleChg("completed")}>
            已完成-{completedCount}
          </span>
        </div>
        <div className="list-all">
          {allList.map((item, index) => {
            return (
              (this.listFlag.get() === "all" ||
                (this.listFlag.get() === "activing" && !item.isCompleted) ||
                (this.listFlag.get() === "completed" && item.isCompleted)) &&
              (!this.searchKeyword ||
                item.title.indexOf(this.searchKeyword) > -1) && (
                <Todo index={index} item={item} store={this.props.store} />
              )
            );
          })}
        </div>
      </div>
    );
  }
}

export default TodoList;
