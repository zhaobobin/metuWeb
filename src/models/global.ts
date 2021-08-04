import { Effect, Reducer } from 'umi';
import { userApi } from '@/api/index';
import { IUserInfo } from 'metu-ui/dist/types/CommonTypes';
import { Storage } from 'metu-ui/dist/utils/index';
import ENV from '@/config/env';
// import { Toast } from 'antd';
import { RootState } from './index';

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
  effects: {};
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
  readModel: Storage.get(ENV.storage.lastTel) || '', // 阅读模式
};

const globalModel: GlobalModel = {
  namespace: 'global',

  state: initialState,

  effects: {},

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
