import { Request } from 'metu-ui/dist/utils/index';

export const categoryApi = {
  getMyTopics: (params: { userId: string }) => {
    return Request({
      url: `/users/${params.userId}/following/topics`,
      method: 'get',
    });
  },

  getTopics: () => {
    return Request({ url: '/topics', method: 'get' });
  },
};
