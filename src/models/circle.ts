import { Effect, Reducer } from 'umi';
import { circleApi } from '@/api/index';
// import { Toast } from '@/components/index';
import { ICircleItem, ICircleMembers } from 'metu-ui/dist/types/CircleTypes';
import { RootState } from './index';

export interface ICircleState {
  circleList: ICircleItem[];
  circleDetail: ICircleItem | null;
  circleMembers: ICircleMembers;
}

interface CircleModel {
  namespace: string;
  state: ICircleState;
  effects: {
    queryCircleList: Effect;
    queryCircleDetail: Effect;
    queryCircleMembers: Effect;
    checkJoinStatus: Effect;
    joinCircle: Effect;
    exitCircle: Effect;
  };
  reducers: {
    setState: Reducer<ICircleState>;
    clearCircleDetail: Reducer<ICircleState>;
    updateCircleDetail: Reducer<ICircleState>;
  };
}

const initialState: ICircleState = {
  circleList: [],
  circleDetail: null,
  circleMembers: {
    list: [],
    pageInfo: {
      page: 1,
      per_page: 10,
      count: 0,
      has_more: true,
    },
  },
};

const circleModel: CircleModel = {
  namespace: 'circle',

  state: initialState,

  effects: {
    *queryCircleList({ payload, callback }, { call, put }) {
      const res = yield call(circleApi.getCircleList, payload);
      if (res.code === 0) {
        yield put({
          type: 'setState',
          payload: {
            circleList: res.data.list,
          },
        });
        callback && callback();
      } else {
        // Toast.info(res.message, 2);
      }
    },
    *queryCircleDetail({ payload }, { call, put }) {
      const res = yield call(circleApi.getCircleDetail, payload);
      if (res.code === 0) {
        yield put({
          type: 'setState',
          payload: {
            circleDetail: res.data,
          },
        });
      } else {
        // Toast.info(res.message, 2);
      }
    },
    *queryCircleMembers({ payload, callback }, { call, put, select }) {
      // const res = yield call(circleApi.getCircleMembers, payload);
      const { list, pageInfo } = yield select(
        (state: RootState) => state.circle.circleMembers,
      );
      let page = 1;
      if (payload && payload.loadMore) {
        page = pageInfo.page + 1;
      }
      const res = yield call(circleApi.getCircleMembers, {
        circle_id: payload.circle_id,
        page,
        per_page: pageInfo.per_page,
      });
      let newList = res.data.list;
      if (payload && payload.loadMore) {
        newList = list.concat(newList);
      }
      if (res.code === 0) {
        yield put({
          type: 'setState',
          payload: {
            circleMembers: {
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
      } else {
        // Toast.info(res.message, 2);
      }
    },
    *checkJoinStatus({ payload }, { call, put }) {
      const res = yield call(circleApi.getCircleDetail, payload);
      if (res.code === 0) {
        yield put({
          type: 'updateCircleDetail',
          payload: res.data,
        });
      } else {
        // Toast.info(res.message, 2);
      }
    },
    *joinCircle({ payload }, { call, put }) {
      const res = yield call(circleApi.joinCircle, payload);
      if (res.code === 0) {
        yield put({
          type: 'updateCircleDetail',
          payload: res.data,
        });
      } else {
        // Toast.info(res.message, 2);
      }
    },
    *exitCircle({ payload }, { call, put }) {
      const res = yield call(circleApi.exitCircle, payload);
      if (res.code === 0) {
        yield put({
          type: 'updateCircleDetail',
          payload: res.data,
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
    clearCircleDetail(state = initialState, _) {
      return {
        ...state,
        circleDetail: initialState.circleDetail,
      };
    },
    updateCircleDetail(state = initialState, { payload }) {
      return {
        ...state,
        circleDetail: {
          ...state.circleDetail,
          ...payload,
        },
      };
    },
  },
};

export default circleModel;
