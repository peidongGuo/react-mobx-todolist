import React, { Component } from "react";
import "./TodoList.css";
import { observable, action, reaction, computed, autorun, trace } from "mobx";

class TodoStore {
  @observable
  allList = [
    { title: "读书", isCompleted: false },
    { title: "看电影", isCompleted: false }
  ];

  @observable
  message2 = { title: "asdfsdf" };

  constructor() {
    // let title = this.message2;
    autorun(() => {
      console.log(this.message2);
      trace();
    });
    this.message2.title = observable({ title: "Bar" });
  }

  @computed
  get allCount() {
    return this.allList.length;
  }

  @computed
  get activingCount() {
    return this.allList.filter(item => !item.isCompleted).length;
  }

  @computed
  get completedCount() {
    return this.allList.filter(item => item.isCompleted).length;
  }
}

export default TodoStore;
