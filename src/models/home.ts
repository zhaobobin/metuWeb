import { Effect, Reducer } from 'umi';
import { homeApi } from '@/api/index';
import { IPhoto } from 'metu-ui/dist/types/CommonTypes';

export interface IHomeState {
  carsouel: IPhoto[];
  carsouelActiveIndex: number; // 当前轮播图下标
  gradientVisible: boolean; // 首页渐变色组件是否显示
  popular: IPhoto[];
}

interface HomeModel {
  namespace: string;
  state: IHomeState;
  effects: {
    queryCarsouel: Effect;
    queryPopular: Effect;
  };
  reducers: {
    setState: Reducer<IHomeState>;
  };
}

const homeModel: HomeModel = {
  namespace: 'home',

  state: {
    carsouel: [],
    carsouelActiveIndex: 0,
    gradientVisible: true,
    popular: [],
  },

  effects: {
    *queryCarsouel(_, { call, put }) {
      const res = yield call(homeApi.getHomeCarsouel);
      yield put({
        type: 'setState',
        payload: {
          carsouel: res.data,
        },
      });
    },
    *queryPopular(_, { call, put }) {
      const res = yield call(homeApi.getPopularPhotos);
      yield put({
        type: 'setState',
        payload: {
          popular: res.data.list,
        },
      });
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

export default homeModel;
