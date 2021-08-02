import {
  useDispatch,
  useIntl,
  Link,
  IGlobalState,
  ConnectProps,
  ConnectRC,
} from 'umi';
import { connect, ConnectedProps } from 'react-redux';
import { Avatar, Button, Menu, Dropdown } from 'antd';
import { BellOutlined, CloudUploadOutlined } from '@ant-design/icons';
import { RootState } from '@/models/index';
import styles from './global-header-sign.less';

// import GlobalHeaderSearch from '@/components/common/global-header-search';
// import MessagesPopover from '@/blocks/Messages/MessagesPopover';
import UserSignModal from '@/blocks/user/user-sign-modal';
import { Confirm } from '@/components/dialog/dialog';

const mapStateToProps = (state: RootState) => ({
  global: state.global,
});
const connector = connect(mapStateToProps);

interface IProps extends ConnectedProps<typeof connector> {
  global: IGlobalState;
}

const GlobalHeaderSign = (props: IProps) => {
  const dispatch = useDispatch();
  const intl = useIntl();

  // 切换登录注册modal状态
  const setUserModal = (value, key) => {
    dispatch({
      type: 'global/changeSignModal',
      payload: {
        signModalVisible: value,
        signTabKey: key,
      },
    });
  };

  // 退出登录
  const logout = () => {
    Confirm({
      title: '退出登录?',
      callback: (res) => {
        if (res === 1) {
          dispatch({
            type: 'global/logout',
          });
        }
      },
    });
  };

  const { isAuth, currentUser } = props.global;

  return (
    <div className={styles.userAction}>
      {isAuth ? (
        <ul key="logout">
          <li>{/* <GlobalHeaderSearch/> */}</li>

          {/* <MessagesPopover>
                <li>
                  <a className={styles.message}>
                    <BellOutlined style={{ fontSize: '24px' }} />
                    <Icon type="bell" style={{ fontSize: '24px' }} />
                  </a>
                </li>
              </MessagesPopover> */}

          <Dropdown
            overlay={
              <Menu>
                <Menu.Item>
                  <Link to="/publish/photo">
                    {intl.formatMessage({ id: 'menu.publish.photo' })}
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <Link to="/publish/article">
                    {intl.formatMessage({ id: 'menu.publish.article' })}
                  </Link>
                </Menu.Item>
              </Menu>
            }
          >
            <li>
              <Link
                to="/publish/photo"
                className={styles.hasIcon + ' ' + styles.publish}
              >
                <CloudUploadOutlined style={{ fontSize: '24px' }} />
                <span>{intl.formatMessage({ id: 'menu.publish' })}</span>
              </Link>
            </li>
          </Dropdown>

          <Dropdown
            overlay={
              <Menu>
                <Menu.Item>
                  <Link to={`/users/${currentUser.username}`}>
                    {intl.formatMessage({ id: 'menu.user.account' })}
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <Link to="/settings">
                    {intl.formatMessage({ id: 'menu.user.settings' })}
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <a onClick={logout}>
                    {intl.formatMessage({ id: 'menu.user.logout' })}
                  </a>
                </Menu.Item>
              </Menu>
            }
          >
            <li>
              <Link
                to={`/users/${currentUser.username}`}
                className={styles.hasIcon + ' ' + styles.user}
              >
                {currentUser.avatar_url ? (
                  <Avatar
                    className={styles.avatar}
                    src={
                      currentUser.avatar_url + '?x-oss-process=style/thumb_s'
                    }
                    size={24}
                  />
                ) : (
                  <Avatar className={styles.avatar} icon="user" size={24} />
                )}
                <span className={styles.username}>{currentUser.nickname}</span>
              </Link>
            </li>
          </Dropdown>
        </ul>
      ) : (
        <ul key="login">
          <li className={styles.search}>{/* <GlobalHeaderSearch/> */}</li>

          <li>
            <Button
              className={styles.userBtn}
              onClick={() => setUserModal(true, '1')}
            >
              {intl.formatMessage({ id: 'menu.user.login' })}
            </Button>
          </li>

          <li>
            <Button
              className={styles.userBtn}
              type="primary"
              onClick={() => setUserModal(true, '2')}
            >
              {intl.formatMessage({ id: 'menu.user.register' })}
            </Button>
          </li>
        </ul>
      )}

      <UserSignModal />
    </div>
  );
};

export default connector(GlobalHeaderSign);
