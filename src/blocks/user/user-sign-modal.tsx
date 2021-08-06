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

interface IProps extends ConnectedProps<typeof connector> {}

const UserSignModal = (props: IProps) => {
  //登录注册modal状态
  const setUserModal = (visible: boolean, key: string) => {
    props.dispatch({
      type: 'global/changeSignModal',
      payload: {
        signModalVisible: visible,
        signTabKey: key,
      },
    });
  };

  const loginCallback = () => {
    setUserModal(false, '1');
  };

  const registerCallback = () => {
    setUserModal(false, '2');
  };

  const { signModalVisible, signTabKey } = props.global;

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
      onCancel={() => setUserModal(false, '1')}
    >
      <div className={styles.content}>
        <div className={styles.head}>
          <img src={logo} alt="logo" />
          <strong>{ENV.info.slogan}</strong>
        </div>
        <div className={styles.body}>
          {signTabKey === '1' ? (
            <UserLogin showType="modal" callback={loginCallback} />
          ) : (
            <UserRegister showType="modal" callback={registerCallback} />
          )}
        </div>
      </div>
    </Modal>
  );
};

export default connector(UserSignModal);
