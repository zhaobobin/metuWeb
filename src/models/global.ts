import { Effect, Reducer, history } from 'umi';
import { notification } from 'antd';
import { Storage, Request } from 'metu-ui/dist/utils/index';
import ENV from '@/config/env';

export interface IGlobalState {
  lastTel: string;
  signModalVisible: boolean; //登录modal的显示状态
  signTabKey: string; //登录modal中tab的默认key
  theme: any; // 主题
  readModel: string; // 阅读模式readModel) || 'black',  // 阅读模式
}

interface GlobalModel {
  namespace: string;
  state: IGlobalState;
  effects: {
    request: Effect;
  };
  reducers: {
    setState: Reducer<IGlobalState>;
    changeSignModal: Reducer<IGlobalState>;
    changeReadModel: Reducer<IGlobalState>;
  };
}

const initialState = {
  lastTel: Storage.get(ENV.storage.lastTel) || '',
  signModalVisible: false, //登录modal的显示状态
  signTabKey: '', //登录modal中tab的默认key
  theme: Storage.get(ENV.storage.theme) || {}, // 主题
  readModel: Storage.get(ENV.storage.readModel) || 'black', // 阅读模式
};

const globalModel: GlobalModel = {
  namespace: 'global',

  state: initialState,

  effects: {
    *request({ url, method, payload, callback }, { call, put }) {
      let res: any;
      const exp = payload.exp;
      const storage = Storage.get(url);

      if (exp && storage) {
        res = storage;
      } else {
        res = yield call(
          (params: any) => Request({ url, method: method || 'post', params }),
          payload,
        );
        if (res.code === 0 && exp) Storage.set(url, res);
      }

      //登录过期等
      if (res.code === 401) {
        Storage.remove(ENV.storage.token); //删除token
        notification.error({
          message: '提示',
          description: res.message,
        });
        yield put({
          type: 'changeLoginStatus',
          payload: {
            isAuth: false,
            userInfo: '',
          },
        });
        history.push('/');
      } else {
        yield callback(res);
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
    changeSignModal(state = initialState, { payload }) {
      return {
        ...state,
        signModalVisible: payload.signModalVisible,
        signTabKey: payload.signTabKey,
      };
    },
    changeReadModel(state = initialState, { payload }) {
      return {
        ...state,
        readModel: payload.readModel,
      };
    },
  },
};

export default globalModel;
