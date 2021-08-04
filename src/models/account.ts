import { Effect, Reducer } from 'umi';
import { userApi } from '@/api/index';
import { IUserInfo } from 'metu-ui/dist/types/CommonTypes';
import { Storage } from 'metu-ui/dist/utils/index';
import ENV from '@/config/env';
import { RootState } from './index';

export interface IAccountState {
  isAuth: boolean; // 登录状态
  currentUser: IUserInfo; // 当前用户信息
  profileUser: IUserInfo; // 其他用户信息
}

interface UserModel {
  namespace: string;
  state: IAccountState;
  effects: {
    checkMobile: Effect;
    register: Effect;
    login: Effect;
    token: Effect;
    getSmscode: Effect;
    checkSmscode: Effect;
    logout: Effect;
    queryAccountDetail: Effect;
    updateAvatar: Effect;
    updateCover: Effect;
    changeProfile: Effect;
    changeMobile: Effect;
    changePsd: Effect;
    resetPsd: Effect;
  };
  reducers: {
    setState: Reducer<IAccountState>;
  };
}

const initialState = {
  isAuth: false,
  currentUser: {
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
  profileUser: {
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
  namespace: 'account',

  state: initialState,

  effects: {
    *checkMobile({ payload, callback }, { call, put }) {
      const res = yield call(userApi.checkMobile, payload);
      callback && callback(res);
    },

    *register({ payload, callback }, { call, put }) {
      const res = yield call(userApi.register, payload);
      if (res.code === 0) {
        yield put({
          type: 'setState',
          payload: {
            isAuth: true,
            currentUser: res.data.detail,
          },
        });
        Storage.set(ENV.storage.token, res.data.token); //保存token
      }
      callback && callback(res);
    },

    *login({ payload, callback }, { call, put }) {
      const res = yield call(userApi.login, payload);
      if (res.code === 0) {
        yield put({
          type: 'setState',
          payload: {
            isAuth: true,
            currentUser: res.data.detail,
          },
        });
        Storage.set(ENV.storage.lastTel, payload.mobile); //保存token
        Storage.set(ENV.storage.token, res.data.token); //保存token
      }
      callback && callback(res);
    },

    *token({ payload, callback }, { call, put }) {
      const token = yield Storage.get(ENV.storage.token);
      if (token) {
        const res = yield call(userApi.token, payload);
        if (res.code === 0) {
          yield put({
            type: 'setState',
            payload: {
              isAuth: true,
              currentUser: res.data,
            },
          });
        }
        callback && callback(res);
      } else {
        yield put({
          type: 'setState',
          payload: {
            isAuth: false,
            currentUser: '',
          },
        });
      }
    },

    *getSmscode({ payload, callback }, { call }) {
      const res = yield call(userApi.smscode, payload);
      callback && callback(res);
    },

    *checkSmscode({ payload, callback }, { call }) {
      const res = yield call(userApi.checkSmscode, payload);
      callback && callback(res);
    },

    *logout(_, { put }) {
      yield Storage.remove(ENV.storage.token);
      yield put({
        type: 'setState',
        payload: {
          isAuth: false,
          currentUser: '',
        },
      });
    },

    *queryAccountDetail({ payload }, { call, put }) {
      const res = yield call(userApi.getUserDetail, {
        id: payload.id,
      });
      if (res.code === 0) {
        yield put({
          type: 'setState',
          payload: {
            currentUser: res.data,
          },
        });
      } else {
        // Toast.show(res.messge);
      }
    },

    *updateAvatar({ payload }, { call, put, select }) {
      const { currentUser } = yield select((state: RootState) => state.account);
      const res = yield call(userApi.updateAvatar, {
        url: payload.url,
      });
      if (res.code === 0) {
        yield put({
          type: 'setState',
          payload: {
            currentUser: {
              ...currentUser,
              ...res.data,
            },
          },
        });
      } else {
        // Toast.show(res.messge);
      }
    },

    *updateCover({ payload }, { call, put, select }) {
      const { currentUser } = yield select((state: RootState) => state.account);
      const res = yield call(userApi.updateCover, {
        url: payload.url,
      });
      if (res.code === 0) {
        yield put({
          type: 'setState',
          payload: {
            currentUser: Object.assign(currentUser, res.data),
          },
        });
      } else {
        // Toast.show(res.messge);
      }
    },

    *changeProfile({ payload, callback }, { call, put, select }) {
      const { currentUser } = yield select((state: RootState) => state.account);
      const res = yield call(userApi.changeProfile, payload);
      if (res.code === 0) {
        yield put({
          type: 'setState',
          payload: {
            currentUser: Object.assign(currentUser, res.data),
          },
        });
      } else {
        // Toast.show(res.messge);
      }
      callback && callback(res);
    },

    *changeMobile({ payload, callback }, { call }) {
      const res = yield call(userApi.changeMobile, payload);
      if (res.code === 0) {
      } else {
        // Toast.show(res.messge);
      }
      callback && callback(res);
    },

    *changePsd({ payload, callback }, { call }) {
      const res = yield call(userApi.changePsd, payload);
      callback && callback(res);
    },

    *resetPsd({ payload, callback }, { call }) {
      const res = yield call(userApi.resetPsd, payload);
      callback && callback(res);
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

export default userModel;
