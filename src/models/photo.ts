import { Effect, Reducer } from 'umi';
import { photoApi } from '@/api/index';
import { IPhotoDetail } from 'metu-ui/dist/types/CommonTypes';
// import { Toast } from '@/components/index';

export interface IPhotoState {
  photoDetail: IPhotoDetail;
}

interface PhotoModel {
  namespace: string;
  state: IPhotoState;
  effects: {
    queryPhotoDetail: Effect;
    queryPhotoState: Effect;
    favorPhoto: Effect;
    collectPhoto: Effect;
    nextPhoto: Effect;
  };
  reducers: {
    setState: Reducer<IPhotoState>;
    updatePhotoDetail: Reducer<IPhotoState>;
    clearPhotoDetail: Reducer<IPhotoState>;
  };
}

const initialState: IPhotoState = {
  photoDetail: {
    _id: '',
    title: '',
    thumb: {
      url: '',
      width: 0,
      height: 0,
    },
    author: {
      _id: '',
      type: '',
      level: 0,
      point: 0,
      status: 0,
      tags: [],
      nickname: '',
      username: '',
      create_at: '',
      update_at: '',
    },
    images: [],
    view_number: 0,
    favor_number: 0,
    collect_number: 0,
    comment_number: 0,
    editor: 0,
    status: 0,
    create_at: '',
    update_at: '',
  },
};

const photoModel: PhotoModel = {
  namespace: 'photo',

  state: initialState,

  effects: {
    *queryPhotoDetail({ payload }, { call, put }) {
      const res = yield call(photoApi.getPhotoDetail, payload);
      if (res.code === 0) {
        yield put({
          type: 'setState',
          payload: {
            photoDetail: res.data,
          },
        });
      } else {
        // Toast.info(res.message, 2);
      }
    },
    *queryPhotoState({ payload }, { call, put }) {
      const res = yield call(photoApi.getPhotoState, payload);
      if (res.code === 0) {
        yield put({
          type: 'updatePhotoDetail',
          payload: res.data,
        });
      } else {
        // Toast.info(res.message, 2);
      }
    },
    *favorPhoto({ payload }, { call, put }) {
      const res = yield call(photoApi.favorPhoto, payload);
      if (res.code === 0) {
        yield put({
          type: 'updatePhotoDetail',
          payload: res.data,
        });
      } else {
        // Toast.info(res.message, 2);
      }
    },
    *collectPhoto({ payload }, { call, put }) {
      const res = yield call(photoApi.collectPhoto, payload);
      if (res.code === 0) {
        yield put({
          type: 'updatePhotoDetail',
          payload: res.data,
        });
      } else {
        // Toast.info(res.message, 2);
      }
    },
    *nextPhoto({ payload }, { call, put }) {
      const res = yield call(photoApi.getNextPhoto, payload);
      if (res.code === 0) {
        yield put({
          type: 'setState',
          payload: {
            photoDetail: res.data,
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
    updatePhotoDetail(state = initialState, { payload }) {
      return {
        ...state,
        photoDetail: {
          ...state.photoDetail,
          ...payload,
        },
      };
    },
    clearPhotoDetail(state = initialState) {
      return {
        ...state,
        photoDetail: initialState.photoDetail,
      };
    },
  },
};

export default photoModel;
