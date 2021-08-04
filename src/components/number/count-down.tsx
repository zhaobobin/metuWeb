import React from 'react';

let timer;

interface IProps {
  num: number;
  onEnd: () => void;
}

interface IState {
  count: number;
}

export default class CountDown extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  componentDidMount() {
    this.interval();
  }

  componentWillUnmount() {
    clearInterval(timer);
  }

  //倒计时
  interval() {
    let num = this.props.num;
    this.setState({ count: num });
    timer = setInterval(() => {
      if (num === 1) {
        clearInterval(timer);
        this.props.onEnd();
      } else {
        num--;
        this.setState({ count: num });
      }
    }, 1000);
  }

  render() {
    return <span>{this.state.count}</span>;
  }
}
