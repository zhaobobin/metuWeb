import { Request } from 'metu-ui/dist/utils/index';

export const commentApi = {
  getCommentList: (params: {
    id: string;
    type: 'photos' | 'articles';
    page?: number;
    per_page?: number;
  }) => {
    return Request({
      url: `/${params.type}/${params.id}/comments`,
      method: 'get',
      params: {
        page: params.page,
        per_page: params.per_page,
      },
    });
  },

  createComment: (params: {
    category: string;
    detail_id: string;
    content: string;
  }) => {
    return Request({
      url: `/${params.category}/${params.detail_id}/comments`,
      method: 'post',
      params: {
        content: params.content,
      },
    });
  },

  replyComment: (params: {
    category: string;
    detail_id: string;
    comment_id: string;
    reply_to: string;
    content: string;
  }) => {
    return Request({
      url: `/${params.category}/${params.detail_id}/comments/${params.comment_id}/reply`,
      method: 'post',
      params: {
        content: params.content,
        root_comment_id: params.comment_id,
        reply_to: params.reply_to,
      },
    });
  },

  favorComment: (params: {
    category: string;
    detail_id: string;
    comment_id: string;
    favoring_state: boolean;
  }) => {
    const method = params.favoring_state ? 'delete' : 'put';
    return Request({
      url: `/${params.category}/${params.detail_id}/comments/favoring/${params.comment_id}`,
      method,
    });
  },
};
