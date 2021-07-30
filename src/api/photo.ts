import { Request } from 'metu-ui/dist/utils/index';
import { IPhotoPublishForm } from 'metu-ui/dist/types/PublishTypes';

export const photoApi = {
  // 用户发布的图片列表
  getUserPhotos: (params: {
    user_id: string;
    page?: number;
    per_page?: number;
  }) => {
    return Request({
      url: `/users/${params.user_id}/photos`,
      method: 'get',
      params: {
        page: params.page,
        per_page: params.per_page,
      },
    });
  },

  // 用户点赞的图片列表
  getFavoringPhotos: (params: {
    user_id: string;
    page?: number;
    per_page?: number;
  }) => {
    return Request({
      url: `/users/${params.user_id}/favoring/photos`,
      method: 'get',
      params: {
        page: params.page,
        per_page: params.per_page,
      },
    });
  },

  // 用户收藏的图片列表
  getCollectingPhotos: (params: {
    user_id: string;
    page?: number;
    per_page?: number;
  }) => {
    return Request({
      url: `/users/${params.user_id}/collecting/photos`,
      method: 'get',
      params: {
        page: params.page,
        per_page: params.per_page,
      },
    });
  },

  getPhotoDetail: (params: { photo_id: string }) => {
    return Request({ url: `/photos/${params.photo_id}`, method: 'get' });
  },

  createPhoto: (params: IPhotoPublishForm) => {
    return Request({
      url: '/photos',
      method: 'post',
      params,
    });
  },

  // 状态
  getPhotoState: (params: { photo_id: string }) => {
    return Request({ url: `/photos/${params.photo_id}/state`, method: 'get' });
  },

  // 下一组
  getNextPhoto: (params: { photo_id: string }) => {
    return Request({ url: `/photos/${params.photo_id}/next`, method: 'get' });
  },

  // 点赞图片、取消点赞
  favorPhoto: (params: { photo_id: string; favoring_state: boolean }) => {
    const method = params.favoring_state ? 'delete' : 'put';
    return Request({ url: `/photos/favoring/${params.photo_id}`, method });
  },

  // 收藏图片、取消收藏
  collectPhoto: (params: { photo_id: string; collecting_state: boolean }) => {
    const method = params.collecting_state ? 'delete' : 'put';
    return Request({ url: `/photos/collecting/${params.photo_id}`, method });
  },

  // 分享图片
  sharePhoto: (params: { photo_id: string }) => {
    return Request({
      url: `/photos/shareing/${params.photo_id}`,
      method: 'put',
    });
  },
};
