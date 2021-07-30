import { Request } from 'metu-ui/dist/utils/index';
import { IArticlePublishForm } from 'metu-ui/dist/types/PublishTypes';

export const articleApi = {
  // 用户的文章列表
  getUserArticles: (params: {
    user_id: string;
    page?: number;
    per_page?: number;
  }) => {
    return Request({
      url: `/users/${params.user_id}/articles`,
      method: 'get',
      params: {
        page: params.page,
        per_page: params.per_page,
      },
    });
  },

  getArticleDetail: (params: { article_id: string }) => {
    return Request({ url: `/articles/${params.article_id}`, method: 'get' });
  },

  createArticle: (params: IArticlePublishForm) => {
    return Request({
      url: '/articles',
      method: 'post',
      params,
    });
  },

  // 状态
  getArticleState: (params: { article_id: string }) => {
    return Request({
      url: `/articles/${params.article_id}/state`,
      method: 'get',
    });
  },

  // 下一组
  getNextArticle: (params: { article_id: string }) => {
    return Request({
      url: `/articles/${params.article_id}/next`,
      method: 'get',
    });
  },

  // 点赞文章、取消点赞
  favorArticle: (params: { article_id: string; favoring_state: boolean }) => {
    const method = params.favoring_state ? 'delete' : 'put';
    return Request({ url: `/articles/favoring/${params.article_id}`, method });
  },

  // 收藏文章、取消收藏
  collectArticle: (params: {
    article_id: string;
    collecting_state: boolean;
  }) => {
    const method = params.collecting_state ? 'delete' : 'put';
    return Request({
      url: `/articles/collecting/${params.article_id}`,
      method,
    });
  },

  // 分享文章
  shareArticle: (params: { article_id: string }) => {
    return Request({
      url: `/articles/shareing/${params.article_id}`,
      method: 'put',
    });
  },
};
