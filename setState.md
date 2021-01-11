react管控下的 setState 均为异步更新机制。为了提升性能，进行批量更新。
管控实现：添加 `isBatchingUpdates` 变量，默认 false, 在框架执行流程里，修改为 true，开启异步。更新完成重新设置为 false.
在 setTimeout 中，会脱离 react 管控，进行同步更新。

#### v15 版本：Stack Reconciler
`setState` 的表现会因调用场景的不同而不同：
* 在 React 钩子函数及合成事件中，它表现为 **异步**
* 在 `setTimeout`、`setInterval` 等函数中，
  包括在 DOM 原生事件中，它都表现为 **同步**

#### v16 版本：Fiber Reconciler
