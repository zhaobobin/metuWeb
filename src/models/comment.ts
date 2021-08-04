import { Effect, Reducer } from 'umi';
import { commentApi } from '@/api/index';
// import { Toast } from '@/components/index';
import { ICommentlist } from 'metu-ui/dist/types/CommentTypes';
import { RootState } from './index';

export interface ICommentState {
  commentList: ICommentlist;
}

interface CommentModel {
  namespace: string;
  state: ICommentState;
  effects: {
    queryCommentList: Effect;
    create: Effect;
    reply: Effect;
    favor: Effect;
  };
  reducers: {
    setState: Reducer<ICommentState>;
    clearCommentList: Reducer<ICommentState>;
  };
}

const initialState = {
  commentList: {
    list: [],
    pageInfo: {
      page: 1,
      per_page: 10,
      count: 0,
      has_more: true,
    },
  },
};

const commentModel: CommentModel = {
  namespace: 'comment',

  state: {
    commentList: initialState.commentList,
  },

  effects: {
    *queryCommentList({ payload, callback }, { call, put, select }) {
      const { list, pageInfo } = yield select(
        (state: RootState) => state.comment.commentList,
      );
      let page = 1;
      if (payload && payload.loadMore) {
        page = pageInfo.page + 1;
      }
      const res = yield call(commentApi.getCommentList, {
        id: payload.id,
        type: payload.type,
        page,
        per_page: pageInfo.per_page,
      });
      let newList = res.data.list;
      if (payload && payload.loadMore) {
        newList = list.concat(newList);
      }
      yield put({
        type: 'setState',
        payload: {
          commentList: {
            list: newList,
            pageInfo: {
              page,
              per_page: pageInfo.per_page,
              count: res.data.count,
              has_more: res.data.hasMore,
            },
          },
        },
      });
      callback && callback();
    },
    *create({ payload, callback }, { call }) {
      const res = yield call(commentApi.createComment, payload);
      if (res.code === 0) {
        callback();
      } else {
        // Toast.info(res.message, 2);
      }
    },
    *reply({ payload, callback }, { call }) {
      const res = yield call(commentApi.replyComment, payload);
      if (res.code === 0) {
        callback();
      } else {
        // Toast.info(res.message, 2);
      }
    },
    *favor({ payload }, { call, put, select }) {
      const { list, pageInfo } = yield select(
        (state: RootState) => state.comment.commentList,
      );
      const res = yield call(commentApi.favorComment, payload);
      if (res.code === 0) {
        for (const item of list) {
          if (item._id === payload.comment_id) {
            item.favor_number = res.data.favor_number;
            item.favoring_state = res.data.favoring_state;
          }
        }
        yield put({
          type: 'setState',
          payload: {
            commentList: {
              list: list.slice(0),
              pageInfo,
            },
          },
        });
      } else {
        // Toast.info(res.message, 2);
      }
    },
  },

  reducers: {
    setState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    clearCommentList(state = initialState) {
      return {
        ...state,
        commentList: initialState.commentList,
      };
    },
  },
};

export default commentModel;
