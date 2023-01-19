import { useRef } from 'react';
import { history, useDispatch, useSelector } from 'umi';
import { Avatar, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { IRootState } from '@/models';
import styles from './account-header-info.less';

import SignAuth, { SignAuthRef } from '@/blocks/auth/sign-auth';

const AccountHeaderInfo = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(
    (state: IRootState) => state.account.currentUser,
  );
  const userDetail = useSelector((state: IRootState) => state.user.userDetail);

  let signAuthRef = useRef<SignAuthRef>();

  // 关注用户
  const followingUser = () => {
    const user_id = userDetail._id;
    dispatch({
      type: 'user/followUser',
      payload: {
        user_id,
      },
      callback: (res) => {},
    });
  };

  // 完善个人资料
  const editUserDetail = () => {
    history.push('/settings/bind');
  };

  return (
    <div className={styles.accountHeaderInfo}>
      <div className={styles.avatar}>
        {userDetail.avatar_url ? (
          <Avatar
            src={userDetail.avatar_url + '?x-oss-process=style/thumb_s'}
            size={100}
          />
        ) : (
          <Avatar icon={<UserOutlined />} size={100} />
        )}
      </div>

      <div className={styles.btns}>
        <Button>分享</Button>
        {userDetail._id === currentUser._id ? (
          <Button type="primary" onClick={editUserDetail}>
            完善个人资料
          </Button>
        ) : (
          <SignAuth ref={signAuthRef} callback={followingUser}>
            <Button type="primary" onClick={() => signAuthRef.current?.check()}>
              关注
            </Button>
          </SignAuth>
        )}
      </div>

      <div className={styles.detail}>
        <h1 className={styles.username}>
          <span>{userDetail.nickname}</span>
        </h1>

        <p className={styles.headline}>
          <span>{userDetail.headline}</span>
        </p>

        <p className={styles.info}>
          <span>{userDetail.location || '中国'}</span>
          <span>关注 {userDetail.following_number}</span>
          <span>粉丝 {userDetail.followers_number}</span>
        </p>
      </div>
    </div>
  );
};

export default AccountHeaderInfo;
