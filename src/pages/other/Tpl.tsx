import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Storage } from 'metu-ui/dist/utils/index';
import ENV from '@/config/env';
import { RootState } from '@/models/index';

const mapStateToProps = (state: RootState) => ({
  global: state.global,
});
const connector = connect(mapStateToProps);

interface IProps extends ConnectedProps<typeof connector> {}

interface IState {}

class UserSignModal extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  //登录注册modal状态
  setUserModal(value, key) {
    this.props.dispatch({
      type: 'account/changeSignModal',
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
