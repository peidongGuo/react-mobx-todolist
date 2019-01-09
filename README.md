# react-mobx-todolist

用 react 、mobx 组合实现一个 todolist 的 Demo

### 命令行

```sh
   create-react-app
```

### app 功能

1. 在输入框中输入内容后按 enter 键，即可把内容添加到下面的列表中（如果内容为空则不添加）
2. 动态计算有几个未完成的任务
3. 点击复选框，实现选中或不选中效果（即完成或未完成）
4. 鼠标移入列表，会出现一个删除按钮，点击删除按钮即可删除该列表
5. 双击列表中的内容，可对列表内容进行编辑,编辑完成后，按 enter 键完成编辑，或者当输入框失去焦点的时候也是完成编辑,如果想要取消修改，按 esc 键即可取消编辑
6. 单击上面的所有任务、未完成任务、已完成任务，三个按钮可以切换任务列表
7. 搜索功能，能根据关键字搜索各个列表的数据

### 2018.11.6 完成 react 版本

### 2018.11.14 完成 react-mobx 版本

- 当前版本，可观察的变量放在了组件里面，变成局部状态

### 最难的问题：

- create-react-app 与 mobx 的配置使用

* 因为要用到装饰器，所以需要用 babel，但之前 create-react-app 版本是 v1.5.13 用了 npm run eject，然后 install babel-plugin-transform-decorators-legacy，最后配置了 babelrc 文件，一样是不报错但变量不能被观察，这个错误差点让我对 mobx 产生了怀疑。
* 后来将 create-react-app 升级到 v2.1.1，用 react-app-rewired + customize-cra 再加上相应配置就好了。
* 可以把这个配置写个博文。

### 2019.1.7

1.  完成 TodoList 样式的拷坝

### 2019.1.8

1.  完成 TodoList 的 react 原始版本和 mobx 版本
