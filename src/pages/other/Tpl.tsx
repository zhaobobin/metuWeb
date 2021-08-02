import React from 'react';
import { connect, Dispatch } from 'umi';
import { ConnectedProps } from 'react-redux';
import ENV from '@/config/env';
import { RootState } from '@/models/index';

const mapStateToProps = (state: RootState) => ({
  global: state.global,
});
const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  dispatch: Dispatch;
}

interface IState {}

class UserSignModal extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  //登录注册modal状态
  setUserModal(value, key) {
    this.props.dispatch({
      type: 'global/changeSignModal',
      payload: {
        signModalVisible: value,
        signTabKey: key,
      },
    });
  }

  loginCallback = () => {
    this.setUserModal(false, '1');
  };

  registerCallback = () => {
    this.setUserModal(false, '2');
  };

  render() {
    const {} = this.props.global;

    return <div></div>;
  }
}

export default connector(UserSignModal);
