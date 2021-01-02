#### v16版本

**`getDerivedStateFromProps`:**
* **`static`** 的，内部无法访问 **`this`**
* 作用：强制使用 `props` 来派生/更新 `state`，并非 `componentWillMount` 替代品。而其试图替代 `componentWillReceiveProps`，需与`componentDidUpdate`一起使用【因为拿不到内部 this 指向】。
* 触发时机：挂载/更新触发。v16.3版本：仅当new props触发，^v16.4版本：New props、setState()、forceUpdate()均触发。
* 接收： `(props, state)`
* 返回值: 一个对象格式的返回值。 `null | object`，不使用不写！
* 更新模式：对 state 的更新动作并非“覆盖”式的更新，而是针对某个属性的定向更新
* ```js
  // old state: { text: 1 }
  static getDerivedStateFromProps(props, state) {
    return {
      fatherText: 2
    }
    // new state { text: 1, fatherText: 2 }
  }
  ```

**`getSnapshotBeforeUpdate`：**
* 其返回值作为第三个参数给到`componentDidUpdate`,替代了 `componentWillUpdate`
* 执行时机：render方法之后，真实DOM更新之前
* ```js
  getSnapshotBeforeUpdate(prevProps, prevState) {
    return '123'
  }

  componentDidUpdate(prevProps, prevState, valueFromSnapshot) {
    console.log(valueFromSnapshot) // '123'
  }
  ```

> 🚦 React16 为何两次求变？
> * Fiber 是 React16 对 React 核心算法的一次重写
> * Fiber 会使原本同步的渲染过程变成异步的【同步渲染占用主线程，使得页面卡顿，使用异步解决此问题】
> **render 前的阶段在执行过程中允许被打断，而 commit 阶段则总是同步执行的**

----
### 新版本

* 挂载
* 更新
* 卸载

------

#### 旧版本

* 挂载
  * ~~`componentWillMount`~~
  * `componentDidMount`
  * *`componentDidCatch(error, errorInfo) // 捕获组件内部错误`*
* 更新
  * ~~`componentWillReceiveProps(nextProps) // 父组件修改组件的props时会调用❌【如果父组件导致组件重新渲染，即使props没有更改，也会调用此方法，如果真想处理更改，请确保进行当前值与变更值的比较。】`~~ 🚥 <u>**并不是由 props 的变化触发的，而是由父组件的更新触发的。**</u>
  * ~~`componentWillUpdate(nextProps,nextState) // 组件更新时调用`~~
  * `shouldComponentUpdate(nextProps,nextState) => true[默认true]`【性能优化点】
  * `componentDidUpdate(nextProps,nextState) // 组件更新后调用`
* 卸载
  * `componentWillUnmount`

-----
React 16 对 render 方法也进行了一些改进。
React 16 之前，render方法必须返回单个元素，
而 React 16 允许我们返回元素数组和字符串。
