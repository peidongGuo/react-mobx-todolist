import { observable, action, reaction } from "mobx";

export default class TestStore {
  //   person = observable({
  //     firstName: "Clive Staples",
  //     lastName: "Lewis"
  //   });
  @observable message = ["test"];
  // message = observable.box("test");

  @action
  chgMsg(msg) {
    console.log(123123);
    this.message.push(msg);
    console.log(this.message);
  }
}
