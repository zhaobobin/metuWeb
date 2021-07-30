import { Request } from 'metu-ui/dist/utils/index';

export const ossApi = {
  getOssToken: () => {
    return Request({
      url: '/oss/token',
      method: 'post',
    });
  },
};
