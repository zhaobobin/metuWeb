import { useIntl, useSelector, useDispatch, Link } from 'umi';
import { Avatar, Button, Dropdown } from 'antd';
import { CloudUploadOutlined, UserOutlined } from '@ant-design/icons';
import { IRootState } from '@/models/index';
import styles from './global-header-sign.less';

import GlobalHeaderSearch from '@/components/common/global-header-search';
// import MessagesPopover from '@/blocks/Messages/MessagesPopover';
import UserSignModal from '@/blocks/user/user-sign-modal';
import { Confirm } from '@/components/dialog/dialog';

const GlobalHeaderSign = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const account = useSelector((state: IRootState) => state.account);

  // 切换登录注册modal状态
  const setUserModal = (visible: boolean, key: string) => {
    dispatch({
      type: 'global/changeSignModal',
      payload: {
        signModalVisible: visible,
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
            type: 'account/logout',
          });
        }
      },
    });
  };

  const { isAuth, currentUser } = account;

  const publishMenus = [
    {
      key: '1',
      label: (
        <Link to="/publish/photo">
          {intl.formatMessage({ id: 'menu.publish.photo' })}
        </Link>
      ),
    },
    {
      key: '2',
      label: (
        <Link to="/publish/article">
          {intl.formatMessage({ id: 'menu.publish.article' })}
        </Link>
      ),
    },
  ];

  const accountMenus = [
    {
      key: '1',
      label: (
        <Link to={`/users/${currentUser.username}`}>
          {intl.formatMessage({ id: 'menu.user.account' })}
        </Link>
      ),
    },
    {
      key: '2',
      label: (
        <Link to="/settings">
          {intl.formatMessage({ id: 'menu.user.settings' })}
        </Link>
      ),
    },
    {
      key: '3',
      label: (
        <a onClick={logout}>{intl.formatMessage({ id: 'menu.user.logout' })}</a>
      ),
    },
  ];

  return (
    <div className={styles.userAction}>
      {isAuth ? (
        <ul key="logout">
          <li>
            <GlobalHeaderSearch />
          </li>

          {/* <MessagesPopover>
            <li>
              <a className={styles.message}>
                <BellOutlined style={{ fontSize: '24px' }} />
                <BellOutlined className={styles.icon} style={{ fontSize: '24px' }} />
              </a>
            </li>
          </MessagesPopover> */}

          <Dropdown menu={{ items: publishMenus }}>
            <li>
              <Link
                to="/publish/photo"
                className={styles.hasIcon + ' ' + styles.publish}
              >
                <CloudUploadOutlined
                  className={styles.icon}
                  style={{ fontSize: '24px' }}
                />
                <span>{intl.formatMessage({ id: 'menu.publish' })}</span>
              </Link>
            </li>
          </Dropdown>

          <Dropdown menu={{ items: accountMenus }}>
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
                  <Avatar
                    className={styles.avatar}
                    icon={<UserOutlined />}
                    size={24}
                  />
                )}
                <span className={styles.username}>{currentUser.nickname}</span>
              </Link>
            </li>
          </Dropdown>
        </ul>
      ) : (
        <ul key="login">
          <li className={styles.search}>
            <GlobalHeaderSearch />
          </li>

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

export default GlobalHeaderSign;
