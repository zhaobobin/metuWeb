import { useState, useEffect } from 'react';
import { useSelector, useDispatch, Link } from 'umi';
import { UserOutlined, EyeOutlined } from '@ant-design/icons';
import { IRootState } from '@/models/index';
import dayjs from 'dayjs';
import styles from './article-author-info.less';

import { Toast } from '@/components';
import SignAuth from '@/blocks/auth/sign-auth';
import UserinfoPopover from '@/blocks/user/userinfo-popover';

const ArticleAuthorInfo = (props) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(
    (state: IRootState) => state.account.currentUser,
  );

  let ajaxFlag: boolean = true;
  let signAuth: any;

  const initialState = {
    loading: true,
    following_state: '',
  };

  const [state, setState] = useState(initialState);

  useEffect(() => {
    const { following_state } = props.detail;
    setState({
      loading: false,
      following_state,
    });
  }, []);

  // 检查权限：未登录、本人
  const checkAuth = () => {
    if (!signAuth.check()) return false;
    const { detail } = props;
    return detail.author._id !== currentUser._id;
  };

  // 关注
  const following = () => {
    if (!ajaxFlag) return;
    ajaxFlag = false;

    if (!checkAuth()) return;

    const { following_state } = state;
    const { detail } = props;

    dispatch({
      type: 'global/request',
      url: `/users/following/${detail.author._id}`,
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

  const { loading, following_state } = state;
  const { detail } = props;

  return (
    <>
      {loading ? null : (
        <div className={styles.container}>
          <UserinfoPopover id={detail.author._id} placement="bottomLeft">
            <Link
              to={`/users/${detail.author.username}`}
              className={styles.avatar}
            >
              {detail.author.avatar_url ? (
                <img
                  src={
                    detail.author.avatar_url + '?x-oss-process=style/thumb_s'
                  }
                  alt="avatar"
                />
              ) : (
                <UserOutlined />
              )}
            </Link>
          </UserinfoPopover>
          <p>
            <Link to={`/users/${detail.author.username}`}>
              <span>{detail.author.nickname}</span>
            </Link>
          </p>
          <p className={styles.date}>
            <span>{dayjs(detail.create_at).format('YYYY-MM-DD')}</span>
            <span>
              <EyeOutlined /> {detail.view_number}
            </span>
          </p>
          {detail.author._id === currentUser._id ? null : (
            <a className={styles.follow} onClick={following}>
              <span>{following_state ? '已关注' : '关注'}</span>
            </a>
          )}

          <SignAuth onRef={(ref) => (signAuth = ref)} />
        </div>
      )}
    </>
  );
};

export default ArticleAuthorInfo;
