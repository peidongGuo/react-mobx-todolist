import React, { Component } from "react";
import { observable, action, reaction } from "mobx";
import { observer } from "mobx-react";

@observer
class TestComponent extends Component {
  render() {
    return (
      <div>
        {this.props.store.message}
        <span
          onClick={() => {
            this.props.store.chgMsg("test111111");
          }}
        >
          点我试试
        </span>
      </div>
    );
  }
}

export default TestComponent;
