/*
 * 图片操作
 */
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'umi';
import {
  HeartFilled,
  HeartOutlined,
  MessageOutlined,
  EllipsisOutlined,
  StarFilled,
  StarOutlined,
} from '@ant-design/icons';
import { IRootState } from '@/models/index';
import styles from './photo-action.less';

import { Toast } from '@/components';
import CusShare from '@/blocks/article/custom-share';
import SignAuth, { SignAuthRef } from '@/blocks/auth/sign-auth';

interface IState {
  loading: boolean;
  _id: string;
  favoring_state: string; // 点赞状态
  favor_number: number; // 点赞数量
  comment_number: number; // 评论数量
  collecting_state: string;
}

const PhotoAction = (props) => {
  const dispatch = useDispatch();
  const account = useSelector((state: IRootState) => state.account);

  let signAuthRef = useRef<SignAuthRef>();
  let ajaxFlag = true;

  const initialState: IState = {
    loading: true,
    _id: '',
    favoring_state: '', // 点赞状态
    favor_number: 0, // 点赞数量
    comment_number: 0, // 评论数量
    collecting_state: '',
  };

  const [state, setState] = useState(initialState);

  useEffect(() => {
    const {
      _id,
      favoring_state,
      favor_number,
      comment_number,
      collecting_state,
    } = props.detail;
    setState({
      loading: false,
      _id,
      favoring_state,
      favor_number,
      comment_number,
      collecting_state,
    });
  }, []);

  useEffect(() => {
    state._id && queryPhotosState(state._id);
  }, [account.isAuth]);

  // 查询文章状态
  const queryPhotosState = (id: string) => {
    dispatch({
      type: 'global/request',
      url: `/photos/${id}/state`,
      method: 'get',
      payload: {},
      callback: (res) => {
        if (res.code === 0) {
          setState({
            ...state,
            favoring_state: res.data.favoring_state,
            favor_number: res.data.favor_number,
            comment_number: res.data.comment_number,
            collecting_state: res.data.collecting_state,
          });
        } else {
          Toast.show(res.message);
        }
      },
    });
  };

  // 检查权限：未登录、本人
  const checkAuth = () => {
    if (!signAuthRef.current?.check()) {
      return false;
    }
    const { detail } = props;
    const { currentUser } = account;
    return detail.author._id !== currentUser._id;
  };

  // 点赞
  const favor = () => {
    if (!ajaxFlag) return;
    ajaxFlag = false;

    if (!checkAuth()) return;

    const { _id, favoring_state } = state;

    dispatch({
      type: 'global/request',
      url: `/photos/favoring/${_id}`,
      method: favoring_state ? 'DELETE' : 'PUT',
      payload: {},
      callback: (res) => {
        setTimeout(() => {
          ajaxFlag = true;
        }, 500);
        if (res.code === 0) {
          setState({
            ...state,
            favoring_state: res.data.favoring_state,
            favor_number: res.data.favor_number,
          });
        } else {
          Toast.show(res.message);
        }
      },
    });
  };

  // 收藏
  const collect = () => {
    if (!ajaxFlag) return;
    ajaxFlag = false;

    if (!checkAuth()) return;

    const { _id, collecting_state } = state;

    dispatch({
      type: 'global/request',
      url: `/photos/collecting/${_id}`,
      method: collecting_state ? 'DELETE' : 'PUT',
      payload: {},
      callback: (res) => {
        setTimeout(() => {
          ajaxFlag = true;
        }, 500);
        if (res.code === 0) {
          setState({
            ...state,
            collecting_state: res.data.collecting_state,
          });
        } else {
          Toast.show(res.message);
        }
      },
    });
  };

  const { theme } = props;
  const {
    loading,
    favoring_state,
    favor_number,
    comment_number,
    collecting_state,
  } = state;

  return (
    <>
      {loading ? null : (
        <div className={styles.handle + ' ' + styles[theme]}>
          <ul>
            <li className={styles.li1}>
              <a title="点赞" onClick={favor}>
                {favoring_state ? <HeartFilled /> : <HeartOutlined />}
                <span className={styles.count}>{favor_number}</span>
              </a>
            </li>
            <li className={styles.li2}>
              <MessageOutlined />
              <span className={styles.count}>{comment_number}</span>
            </li>
            <li className={styles.li3}>
              <CusShare />
            </li>
            <li className={styles.li4}>
              <EllipsisOutlined />
              <div className={styles.menu}>
                <a title="收藏" onClick={collect}>
                  {collecting_state ? <StarFilled /> : <StarOutlined />}
                  <span>收藏</span>
                </a>
                <a>举报</a>
              </div>
            </li>
            {/*<li><a><EllipsisOutlined /></a></li>*/}
          </ul>

          <SignAuth ref={signAuthRef} />
        </div>
      )}
    </>
  );
};

export default PhotoAction;
