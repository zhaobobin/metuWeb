import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Modal } from 'antd';
import ENV from '@/config/env';
import { RootState } from '@/models/index';
import styles from './user-sign-modal.less';

import logo from '@/assets/logo.png';
import UserLogin from '@/blocks/user/user-login';
import UserRegister from '@/blocks/user/user-register';

const mapStateToProps = (state: RootState) => ({
  global: state.global,
});
const connector = connect(mapStateToProps);

interface IProps extends ConnectedProps<typeof connector> {
  // dispatch: Dispatch;
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
    const { signModalVisible, signTabKey } = this.props.global;

    return (
      <Modal
        title=""
        width="430px"
        footer={null}
        centered={true}
        maskClosable={false}
        destroyOnClose={true}
        visible={signModalVisible}
        className={styles.userModal}
        onCancel={() => this.setUserModal(false, '1')}
      >
        <div className={styles.content}>
          <div className={styles.head}>
            <img src={logo} alt="logo" />
            <strong>{ENV.info.slogan}</strong>
          </div>
          <div className={styles.body}>
            {signTabKey === '1' ? (
              <UserLogin showType="modal" callback={this.loginCallback} />
            ) : (
              <UserRegister showType="modal" callback={this.registerCallback} />
            )}
          </div>
        </div>
      </Modal>
    );
  }
}

export default connector(UserSignModal);
