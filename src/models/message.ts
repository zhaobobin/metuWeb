import { Effect, Reducer } from 'umi';
import { RootState } from './index';
import { messageApi } from '@/api/index';
import { IMessage } from 'metu-ui/dist/types/MessageTypes';

export interface IMessageState {
  type: string;
  messageList: IMessage;
}

interface MessageModel {
  namespace: string;
  state: IMessageState;
  effects: {
    queryMessageList: Effect;
  };
  reducers: {
    setState: Reducer<IMessageState>;
  };
}

const messageModel: MessageModel = {
  namespace: 'message',

  state: {
    type: '',
    messageList: {
      list: [],
      pageInfo: {
        page: 1,
        per_page: 10,
        count: 0,
        has_more: true,
      },
    },
  },

  effects: {
    *queryMessageList({ payload, callback }, { call, put, select }) {
      const { list, pageInfo } = yield select(
        (state: RootState) => state.message.messageList,
      );
      let page = 1;
      if (payload && payload.loadMore) {
        page = pageInfo.page + 1;
      }
      const res = yield call(messageApi.getMessageList, {
        type: payload.type,
        sent_to: payload.sent_to,
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
          type: payload.type,
          messageList: {
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
      if (callback) {
        callback();
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
  },
};

export default messageModel;
