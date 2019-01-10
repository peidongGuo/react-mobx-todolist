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
import context from "./pages/Demos/context";
// import TodoStore from "./TodoStore";
// configure({ enforceActions: "always" });
// const store = new TodoStore();

@observer
class FirstCounter extends Component {
  // @observable count = 0;
  // static contextType = context;
  componentDidMount() {
    // console.log(context);
    // console.log(store);
    console.log(this.context);
    this.props.counter.third = 123;
    console.log(this.props.counter);
    // this.count = this.props.second;
  }
  @computed get count2() {
    // trace();
    return this.props.counter.first;
  }
  render(props) {
    // trace();
    // return <div>{this.props.counter.first + "" + this.count}</div>;
    return <div>{this.count2}</div>;
  }
}
// FirstCounter.contextType = context;
@inject(store => store)
@observer
class Counter extends Component {
  // @observable count = 0;

  // @observable
  // count2 = { count: 2 };

  @observable allCount = {
    first: 0,
    second: 0
  };
  count2 = observable({ count3: 1, count: 2 });

  @observable
  counts = [1, 2, 3];

  constructor(props) {
    super(props);
    console.log(this.props);
    this.handler = autorun(() => {
      trace();
      this.counts.length;
      // this.allCount.first;
      // console.log("-----", this.allCount.first);
    });
    // this.handler();

    when(
      () => this.allCount.first == 2,
      () => {
        console.log("allCount 里的 first变为2了！");
      }
    );
  }
  render() {
    // console.log(this.count2);
    // console.log(Array.isArray(this.counts));
    // console.log(this.allCount);
    // trace();
    // const first = this.allCount.first;
    return (
      <div>
        {/* Counter: {this.count} */}
        <br />
        {/* first Counter:{this.allCount.first} */}
        <FirstCounter
          counter={this.allCount}
          // second={this.allCount.second}
        />
        <br />
        second Counter:{this.allCount.second}
        <br />
        <span>{this.count2.count}</span>
        <br />
        <span onClick={this.handleAdd}>+</span>
        <span onClick={this.handleDec}>-</span>
      </div>
    );
  }

  @action
  handleAdd = () => {
    // this.count++;
    this.allCount.first++;
    // this.count2.count = 3;
    this.counts.push(5);
    setTimeout(() => {
      runInAction(() => {
        this.count2.count = 3;
      });
    }, 1000);
    // this.allCount = { first: 2, second: 3 };
    // this.count2 = observable({ count: 3 });
  };

  @action
  handleDec = () => {
    this.count--;
    this.allCount.second--;
    // this.allCount = { first: 2, second: 3 };
  };
}
export default Counter;
