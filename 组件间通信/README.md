父-子组件通信
  * props

子-父组件通信
  * props 函数，参数形式

兄弟组件通信
  * props 子-父-子【不推荐】
  * 发布-订阅模式： EventEmitter: on(type, func)、emit(type, params)、off()
  * Context API
    * 新API，在 shouldComponentUpdate 返回 false, 仍难能够进行“穿透”传播。
    * ```js
      const { Provider, Consumber } = context = React.createContext(defaultValue)

      <Provider value={title: this.state.title, content: this.state.content}>
        <Title />
        <Content />
      </Provider>

      <Consumer>/* 没有 Provider 注入，则使用 defaultValue */
        { value => <div>{ value.title }</div> }
      </Consumer>
      ```
  * Redux
    * store 是一个单一的数据源，而且是只读的
    * action 是对变化的描述，作用是通知 reducer "让变化发生"
      * ```js
        const action = {
          type: 'ADD_ITEM',
          payload: '<li>text</li>'
        }
        ```
    * reducer 负责对变化进行分发和处理，作用是将新的 state 返回给 store
      * ```js
        const reducer = (state, action) => {
          // 此处是各种各样的 state 处理逻辑
          return new_state
        }
        ```
    * ```js
      import { createStore } from 'redux';

      const reducer = (state, action) => {
        // 此处是各种各样的 state 处理逻辑
        return new_state
      }
      // 创建 store
      const store = createStore(
        reducer,
        initial_state,
        applyMiddleware(middleware1, middleware2, ...)
      );

      const action = {
        type: 'ADD_ITEM',
        payload: '<li>text</li>'
      }

      // 使用 dispatch 派发 action,action 会进入到 reducer 里触发对应的更新
      store.dispatch(action)
      ```