import React from 'react';
// import ReactDOM from 'react-dom';

// 定义子组件
class LifeCycle extends React.Component {
  constructor(props) {
    console.log('1、进入constructor');
    super(props);
    // state 可以在 constructor 里初始化
    this.state = { text: '子组件的文本' };
  }
  // 初始化渲染时调用
  componentWillMount() {
    console.log('2、componentWillMount方法执行');
  }
  // 初始化渲染时调用
  componentDidMount() {
    console.log('3、componentDidMount方法执行');
  }
  // 父组件修改组件的props时会调用
  componentWillReceiveProps(nextProps) {
    console.log('4、componentWillReceiveProps方法执行');
  }
  // 组件更新时调用
  shouldComponentUpdate(nextProps,nextState) {
    console.log('5、shouldComponentUpdate方法执行');
    return true;
  }
  // 组件更新时调用
  componentWillUpdate(nextProps,nextState) {
    console.log('6、componentWillUpdate方法执行');
  }
  // 组件更新后调用
  componentDidUpdate(nextProps,nextState) {
    console.log('7、componentDidUpdate方法执行');
  }
  // 组件卸载时调用
  componentWillUnmount() {
    console.log('8、子组件的componentWillUnmount方法执行');
  }
  // 点击按钮，修改子组件文本内容的方法
  changeText = () => {
    console.log([5, 6, 9, 7].toLocaleString());
    this.setState({
      text: '修改后的子组件文本'
    });
  };
  render() {
    console.log('9、render方法执行');
    return (
      <div className='container'>
        <button onClick={this.changeText} className='changeText'>
          修改子组件文本内容
        </button>
        <p className='textContent'>{this.state.text}</p>
        <p className='fatherContent'>{this.props.text}</p>
      </div>
    );
  }
}

// 定义 LifeCycle 组件的父组件
export class LifeCycleContainer extends React.Component {
  // state 也可以像这样用属性声明的形式初始化
  state = {
    text: '父组件的文本',
    hideChild: false
  };
  // 点击按钮，修改父组件文本的方法
  changeText = () => {
    console.log([4, 5, 6, 9, 7].toLocaleString());
    this.setState({
      text: '修改后的父组件文本'
    });
  };
  // 点击按钮，隐藏（卸载）LifeCycle 组件的方法
  hideChild = () => {
    console.log([8].toLocaleString());
    this.setState({
      hideChild: true
    });
  };
  render() {
    console.log([1, 2, 9, 3].toLocaleString());
    return (
      <div className='fatherContainer'>
        <button onClick={this.changeText} className='changeText'>
          修改父组件文本内容
        </button>
        <button onClick={this.hideChild} className='hideChild'>
          隐藏子组件
        </button>
        {this.state.hideChild ? null : <LifeCycle text={this.state.text} />}
      </div>
    );
  }
}

// ReactDOM.render(<LifeCycleContainer />,document.getElementById('root'));
