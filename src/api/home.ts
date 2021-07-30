import { Request } from 'metu-ui/dist/utils/index';

export const homeApi = {
  getHomeCarsouel: () => {
    return Request({ url: '/carsouel', method: 'get' });
  },

  getPopularPhotos: () => {
    return Request({
      url: '/photos',
      method: 'get',
      params: {
        category: 'popular',
        page: 1,
        per_page: 9,
      },
    });
  },

  getPhotosList: (params: { page?: number; per_page?: number }) => {
    return Request({
      url: '/photos',
      method: 'get',
      params,
    });
  },
};
