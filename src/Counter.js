import React, { Component } from "react";
import { observable, action, reaction } from "mobx";
import { observer } from "mobx-react";

@observer
class Counter extends Component {
  @observable count = 0;

  render() {
    return (
      <div>
        Counter: {this.count}
        <span onClick={this.handleAdd}>+</span>
        <span onClick={this.handleDec}>-</span>
      </div>
    );
  }

  handleAdd = () => {
    this.count++;
  };

  handleDec = () => {
    this.count--;
  };
}
export default Counter;
