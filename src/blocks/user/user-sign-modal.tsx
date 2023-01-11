import { useSelector, useDispatch } from 'umi';
import { Modal } from 'antd';
import ENV from '@/config/env';
import { IRootState } from '@/models/index';
import styles from './user-sign-modal.less';

import logo from '@/assets/logo.png';
import UserLogin from '@/blocks/user/user-login';
import UserRegister from '@/blocks/user/user-register';

const UserSignModal = () => {
  const dispatch = useDispatch();
  const global = useSelector((state: IRootState) => state.global);

  //登录注册modal状态
  const setUserModal = (visible: boolean, key: string) => {
    dispatch({
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

  const { signModalVisible, signTabKey } = global;

  return (
    <Modal
      title=""
      width="430px"
      footer={null}
      centered={true}
      maskClosable={false}
      destroyOnClose={true}
      open={signModalVisible}
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

export default UserSignModal;
