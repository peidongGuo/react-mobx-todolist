import React, { Component } from "react";
import {
  observable,
  action,
  reaction,
  trace,
  computed,
  autorun,
  when,
  configure,
  runInAction
} from "mobx";
import { inject, observer } from "mobx-react";

// class SubCounter extends Component {
//   render() {
//     return <div>{this.props.count()}</div>;
//   }
// }
const SubCounter = props => {
  return <div>{props.count()}</div>;
};

@observer
class Counter extends Component {
  @observable count = 0;

  countCopy = this.count;

  constructor(props) {
    super(props);
  }
  render() {
    const countCopy2 = this.count;
    return (
      <div>
        <SubCounter
          count={() => (
            <div>这是 @observable 变量 count的本地拷贝2:{this.count}</div>
          )}
        />
        <span>这是 @observable 变量 count:{this.count}</span>
        <br />
        <span>这是 @observable 变量 count的本地拷贝:{this.countCopy}</span>
        <br />
        <span onClick={this.handleAdd}>Count加一</span>
        <br />
        <span onClick={this.handleDec}>Count减一</span>
      </div>
    );
  }

  @action
  handleAdd = () => {
    this.count++;
  };

  @action
  handleDec = () => {
    this.count--;
  };
}
export default Counter;
