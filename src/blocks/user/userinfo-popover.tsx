/**
 * UserinfoPopover
 */
import React, { useState, useRef } from 'react';
import { useSelector, useDispatch, Link } from 'umi';
import { Popover, Skeleton, Avatar, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Toast } from '@/components';
import { TooltipPlacement } from 'antd/lib/tooltip';
import { IRootState } from '@/models/index';
import styles from './userinfo-popover.less';

import SignAuth, { SignAuthRef } from '@/blocks/auth/sign-auth';

interface IProps {
  id: string;
  placement?: TooltipPlacement;
  children: React.ReactNode;
}

interface IState {
  loading: boolean;
  userInfo: any;
  following_state: string;
}

const UserinfoPopover = (props: IProps) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(
    (state: IRootState) => state.account.currentUser,
  );

  let ajaxFlag: boolean = true;
  let signAuthRef = useRef<SignAuthRef>();

  const initialState: IState = {
    loading: true,
    userInfo: undefined,
    following_state: '',
  };

  const [state, setState] = useState(initialState);

  const queryUserinfo = (userId: string) => {
    if (!ajaxFlag) return;
    ajaxFlag = false;

    dispatch({
      type: 'user/queryUserDetail',
      payload: {
        id: userId,
      },
      callback: (res) => {
        setState({
          loading: false,
          userInfo: res.data,
          following_state: res.data.following_state || '',
        });
        setTimeout(() => {
          ajaxFlag = true;
        }, 1000);
      },
    });
  };

  const onVisibleChange = (visible: boolean) => {
    if (visible) {
      queryUserinfo(props.id);
    }
  };

  // 检查权限：未登录、本人
  const checkAuth = () => {
    if (!signAuthRef.current?.check()) {
      return false;
    }
    const { userInfo } = state;
    return userInfo._id !== currentUser._id;
  };

  // 关注
  const following = () => {
    if (!ajaxFlag) return;
    ajaxFlag = false;

    if (!checkAuth()) return;

    const { userInfo, following_state } = state;

    dispatch({
      type: 'global/request',
      url: `/users/following/${userInfo._id}`,
      method: following_state ? 'DELETE' : 'PUT',
      payload: {},
      callback: (res) => {
        setTimeout(() => {
          ajaxFlag = true;
        }, 500);
        if (res.code === 0) {
          setState({
            ...state,
            following_state: res.data.following_state,
          });
        } else {
          Toast.show(res.message);
        }
      },
    });
  };

  const { loading, userInfo, following_state } = state;

  const content = (
    <div className={styles.container}>
      <Skeleton loading={loading} avatar>
        <div className={styles.body}>
          <div
            className={styles.cover}
            style={{
              backgroundImage: userInfo?.cover_url,
            }}
          />

          <div className={styles.avatar}>
            <Link to={`/users/${userInfo?.username}`}>
              {userInfo?.avatar_url ? (
                <Avatar
                  src={userInfo.avatar_url + '?x-oss-process=style/thumb_s'}
                  size={84}
                />
              ) : (
                <Avatar icon={<UserOutlined />} size={84} />
              )}
            </Link>
          </div>

          <div className={styles.name}>
            <span>{userInfo?.nickname}</span>
          </div>

          <div className={styles.info}>
            <p>
              <span>关注 {userInfo?.following_number}</span>
              <span>粉丝 {userInfo?.followers_number}</span>
              <span>{userInfo?.city ? userInfo.city.name : '中国'}</span>
            </p>
            <p>
              <span>{userInfo?.headline || ''}</span>
            </p>
          </div>

          <div className={styles.action}>
            {userInfo?._id === currentUser._id ? null : (
              <Button type="primary" onClick={following}>
                <span>{following_state ? '已关注' : '关注'}</span>
              </Button>
            )}
          </div>

          <SignAuth ref={signAuthRef} />
        </div>
      </Skeleton>
    </div>
  );

  return (
    <Popover
      trigger="hover"
      placement={props.placement || 'top'}
      content={content}
      arrowPointAtCenter
      onOpenChange={onVisibleChange}
      overlayStyle={{ padding: 0, overflow: 'hidden' }}
    >
      {props.children}
    </Popover>
  );
};

export default UserinfoPopover;
