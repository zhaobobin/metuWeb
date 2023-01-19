import { Effect, Reducer } from 'umi';
import { userApi } from '@/api/index';
import { IUserInfo } from 'metu-ui/dist/types/CommonTypes';
import { Toast } from '@/components/index';
import { IRootState } from './index';

export interface IUserState {
  userDetail: IUserInfo;
}

interface UserModel {
  namespace: string;
  state: IUserState;
  effects: {
    queryUserDetail: Effect;
    followUser: Effect;
    updateUserCover: Effect;
  };
  reducers: {
    setState: Reducer<IUserState>;
    setUserDetail: Reducer<IUserState>;
  };
}

const initialState: IUserState = {
  userDetail: {
    _id: '',
    type: '',
    level: 0,
    point: 0,
    status: 0,
    tags: [],
    following_number: 0,
    followers_number: 0,
    mobile: '',
    nickname: '',
    username: '',
    create_at: '',
    update_at: '',
  },
};

const userModel: UserModel = {
  namespace: 'user',

  state: initialState,

  effects: {
    *queryUserDetail({ payload }, { call, put }) {
      const res = yield call(userApi.getProfileDetail, {
        username: payload.username,
      });
      if (res.code === 0) {
        yield put({
          type: 'setState',
          payload: {
            userDetail: res.data,
          },
        });
      } else {
        Toast.show(res.message);
      }
    },
    *followUser({ payload, callback }, { call }) {
      const res = yield call(userApi.followUser, payload);
      if (res.code === 0) {
        callback && callback(res);
      } else {
        Toast.show(res.message);
      }
    },
    *updateUserCover({ payload, callback }, { call, put, select }) {
      const { userDetail } = yield select((state: IRootState) => state.account);
      const res = yield call(userApi.updateCover, payload);
      if (res.code === 0) {
        yield put({
          type: 'setState',
          payload: {
            userDetail: {
              ...userDetail,
              cover_url: res.data.cover_url,
            },
          },
        });
        callback && callback(res);
      } else {
        Toast.show(res.message);
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
    setUserDetail(state = initialState, { payload }) {
      return {
        ...state,
        userDetail: {
          ...state.userDetail,
          ...payload,
        },
      };
    },
  },
};

export default userModel;
