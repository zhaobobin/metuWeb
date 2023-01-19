/*
 * 评论列表
 * url：查询路径
 * theme：主题配色 black、white
 */
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'umi';
import { IRootState } from '@/models/index';
import styles from './comment-list.less';

import { Toast } from '@/components';
import SignAuth, { SignAuthRef } from '@/blocks/auth/sign-auth';
import CommentForm from './comment-form';
import CommentModal from './comment-modal';
import CommentItem from './comment-item';

interface IProps {
  url: string;
  category: string;
  detail_id: string;
  theme: string;
  onRef?: any;
  callback?: (data: any) => void;
}

interface IState {
  loading: boolean;
  category: string;
  detail_id: string;

  page: number;
  per_page: number;

  list: any[];
  total: number;
  hasMore: boolean;
}

interface IQueryParams {
  category: string;
  detail_id: string;
  query: {
    page: number;
    per_page: number;
  };
  loadMore?: boolean;
}

const CommentList = (props: IProps) => {
  const dispatch = useDispatch();
  const account = useSelector((state: IRootState) => state.account);

  const signAuthRef = useRef<SignAuthRef>();
  let commentModal;
  let commentForm;
  let ajaxFlag = true;

  const initialState: IState = {
    loading: true,
    category: '',
    detail_id: '',

    page: 1,
    per_page: 10,

    list: [],
    total: 0,
    hasMore: false,
  };
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const { category, detail_id } = props;
    queryCommentList({
      category,
      detail_id,
      query: {
        page: state.page,
        per_page: state.per_page,
      },
    });
  }, [props.detail_id]);

  // 查询评论列表
  const queryCommentList = (params: IQueryParams) => {
    if (!ajaxFlag) return;
    ajaxFlag = false;

    dispatch({
      type: 'global/request',
      url: `/${params.category}/${params.detail_id}/comments`,
      method: 'get',
      payload: params.query,
      callback: (res) => {
        if (res.code === 0) {
          setState({
            ...state,
            loading: false,
            category,
            detail_id,
            page: params.query.page,
            list: params.loadMore
              ? state.list.concat(res.data.list)
              : res.data.list,
            total: res.data.count,
            hasMore: res.data.hasMore,
          });
        }
        setTimeout(() => {
          ajaxFlag = true;
        }, 500);
      },
    });
  };

  // 刷新评论列表
  const refreshCommentList = () => {
    const { category, detail_id } = state;
    queryCommentList({
      category,
      detail_id,
      query: {
        page: 1,
        per_page: state.per_page,
      },
    });
  };

  const queryMoreComment = () => {
    const { category, detail_id, page, per_page } = state;
    queryCommentList({
      category,
      detail_id,
      query: {
        page: page + 1,
        per_page,
      },
      loadMore: true,
    });
  };

  // 表单回调
  const formCallback = () => {
    refreshCommentList();
  };

  const modalCallback = (data: any) => {
    refreshCommentList();
  };

  // 点赞评论
  const favor = (item) => {
    if (!ajaxFlag) return;
    ajaxFlag = false;

    if (!signAuthRef.current?.check()) {
      return;
    }

    const { list, category, detail_id } = state;

    dispatch({
      type: 'global/request',
      url: `/${category}/${detail_id}/comments/favoring/${item._id}`,
      method: item.favoring_state ? 'DELETE' : 'PUT',
      payload: {},
      callback: (res) => {
        setTimeout(() => {
          ajaxFlag = true;
        }, 500);
        if (res.code === 0) {
          for (let i in list) {
            if (list[i]._id === item._id) {
              list[i].favoring_state = res.data.favoring_state;
              list[i].favor_number = res.data.favor_number;
            }
          }
          setState({
            ...state,
            list,
          });
        } else {
          Toast.show(res.message);
        }
      },
    });
  };

  // 回复
  const reply = (item) => {
    const { category, detail_id } = state;
    commentModal.show({
      category,
      detail_id,
      comment_id: item._id,
      reply_to: item.author._id,
      placeholder: `回复：${item.author.nickname}`,
    });
  };

  // 举报评论
  const report = (id) => {
    dispatch({
      type: 'global/request',
      url: '',
      method: 'POST',
      payload: {},
      callback: (res) => {
        if (res.code === 0) {
        } else {
        }
      },
    });
  };

  // 查询回复列表
  const queryReplyList = (topic) => {
    if (!ajaxFlag) return;
    ajaxFlag = false;

    dispatch({
      type: 'comment/replyList',
      payload: {
        _id: topic._id, //被回复的评论_id
        ids: topic.reply,
        currentPage: topic.currentPage,
      },
      callback: () => {
        setTimeout(() => {
          ajaxFlag = true;
        }, 500);
      },
    });
  };

  const { loading, category, detail_id, list, total, hasMore } = state;
  const { currentUser } = account;
  const theme = props.theme ? styles[props.theme] : styles.white;

  return (
    <>
      {loading ? null : (
        <div className={styles.comment + ' ' + theme}>
          <div className={styles.title}>
            {total > 0 ? (
              <p>
                <span>{total}</span> 条评论
              </p>
            ) : (
              <p>暂无评论</p>
            )}
          </div>

          <div className={styles.form}>
            <CommentForm
              onRef={(e) => (commentForm = e)}
              category={category}
              detail_id={detail_id}
              callback={formCallback}
              theme={theme}
            />
          </div>

          <div className={styles.list}>
            {total > 0
              ? list.map((item, index) => (
                  <CommentItem
                    item={item}
                    key={index}
                    userId={currentUser._id}
                    theme={theme}
                    action={{
                      report,
                      reply,
                      favor,
                    }}
                  />
                ))
              : null}

            {hasMore ? (
              <a className={styles.moreComment} onClick={queryMoreComment}>
                查看更多评论
              </a>
            ) : null}
          </div>

          <SignAuth ref={signAuthRef} />

          <CommentModal
            onRef={(ref) => (commentModal = ref)}
            callback={modalCallback}
          />
        </div>
      )}
    </>
  );
};

export default CommentList;
