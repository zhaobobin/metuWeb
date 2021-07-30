/**
 * oss 文件上传
 key生成规则：用户id/保存类别_当前时间戳.图片类型
 let key = this.props.global.currentUser._id + '/photo_' + new Date().getTime() + '.' + file.name.split('.')[1];
 */
import { Effect, Reducer } from 'umi';
import { ossApi } from '@/api/index';
// import { Toast } from '@/components/index';
import ENV from '@/config/env';
import {
  Request,
  WebStorage as Storage,
  FetchGet,
} from 'metu-ui/dist/utils/index';
import { notification } from 'antd';

const getClient = function (data) {
  return new window.OSS.Wrapper({
    region: data.region,
    bucket: data.bucket,
    accessKeyId: data.credentials.AccessKeyId,
    accessKeySecret: data.credentials.AccessKeySecret,
    stsToken: data.credentials.SecurityToken,
  });
};
//base64转Blob
const toBlob = function (urlData, fileType) {
  let bytes = window.atob(urlData),
    n = bytes.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bytes.charCodeAt(n);
  }
  return new Blob([u8arr], { type: fileType });
};

export interface IOssState {}

interface PhotoModel {
  namespace: string;
  state: IOssState;
  effects: {
    exif: Effect;
    token: Effect;
    upload: Effect;
    uploadBase64: Effect;
    del: Effect;
  };
  reducers: {
    setState: Reducer<IOssState>;
  };
}

const photoModel: PhotoModel = {
  namespace: 'oss',

  state: {},

  effects: {
    // 源数据
    *exif({ payload }, _) {
      const url = payload.url + '?x-oss-process=image/info';
      const exif = yield FetchGet(url);
      return new Promise((reslove, reject) => {
        if (exif) {
          reslove(exif);
        } else {
          reject('error');
        }
      });
    },
    *token(_, { call }) {
      const ossTokenRes = yield call(ossApi.getOssToken);
      return new Promise((reslove, reject) => {
        if (ossTokenRes.code === 0) {
          Storage.set(ENV.storage.ossToken, ossTokenRes);
          reslove(ossTokenRes);
        } else {
          reject(ossTokenRes);
        }
      });
    },
    // 上传
    *upload({ payload, callback }, { call, put }) {
      let res,
        ossToken = Storage.get(ENV.storage.ossToken, 7200);
      if (ossToken) {
        res = ossToken;
      } else {
        res = yield call((params) => {
          return Request({ url: '/oss/token', method: 'post', body: params });
        }, {});
        Storage.set(ENV.storage.ossToken, res);
      }

      if (res.code === 0) {
        let client = getClient(res.data);
        client
          .multipartUpload(payload.key, payload.file, {})
          .then(function (r) {
            let url = r.res.requestUrls[0].split('?')[0];
            url = url.replace(
              'metuwang.oss-cn-qingdao.aliyuncs.com',
              'photo.metuwang.com',
            );
            return callback(url);
          })
          .catch(function (err) {
            notification.error({
              message: '上传失败！',
              //description: err,
            });
          });
      } else {
        notification.error({
          message: res.message,
        });
      }
    },

    *uploadBase64({ payload, callback }, { call, put }) {
      const res = yield call((params) => {
        return Request({ url: '/oss/token', method: 'post', body: params });
      }, {});
      if (res.code === 0) {
        let client = getClient(res.data);

        let dataUrl = payload.base64;
        let base64 = dataUrl.split(',')[1];
        let fileType = dataUrl.split(';')[0].split(':')[1];
        let blob = toBlob(base64, fileType);
        let reader = new FileReader();

        reader.readAsArrayBuffer(blob);
        reader.onload = function (event) {
          // arrayBuffer转Buffer
          let buffer = new window.OSS.Buffer(event.target.result);
          client
            .put(payload.key, buffer)
            .then(function (r) {
              let url = r.res.requestUrls[0].split('?')[0];
              url = url.replace(
                'metuwang.oss-cn-qingdao.aliyuncs.com',
                'photo.metuwang.com',
              );
              return callback(url);
            })
            .catch(function (err) {
              notification.error({
                message: '上传失败！',
                description: err,
              });
            });
        };
      }
    },

    *del({ payload, callback }, { call, put }) {
      yield put({
        type: 'changeSubmitting',
        payload: true,
      });
      const res = yield call((params) => {
        return Request({
          url: '/api/FileOssEdit',
          method: 'post',
          body: params,
        });
      }, {});
      if (res.code === 0) {
        let client = getClient(res.data);
        client.deleteMulti(payload.keys).catch(function (err) {
          notification.error({
            message: '删除失败！',
            description: err,
          });
        });
      }
      yield put({
        type: 'changeSubmitting',
        payload: false,
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

export default photoModel;
