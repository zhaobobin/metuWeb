import { Request } from 'metu-ui/dist/utils/index';

export const userApi = {
  checkMobile: (params: { mobile: string }) => {
    return Request({
      url: '/user/checkMobile',
      method: 'post',
      params,
    });
  },

  register: (params: {
    mobile: string;
    nickname: string;
    password: string;
    smscode: string;
  }) => {
    return Request({
      url: '/user/register',
      method: 'post',
      params,
    });
  },

  login: (params: { mobile: string; smscode?: string; password?: string }) => {
    return Request({
      url: '/user/login',
      method: 'post',
      params,
    });
  },

  token: (params: { token: string }) => {
    return Request({
      url: '/user/token',
      method: 'post',
      params,
    });
  },

  smscode: (params: { type: string; mobile: string }) => {
    return Request({
      url: '/user/smscode',
      method: 'post',
      params,
    });
  },

  checkSmscode: (params: { mobile: string; smscode: string }) => {
    return Request({
      url: '/user/checkSmscode',
      method: 'post',
      params,
    });
  },

  getUserDetail: (params: { id: string; include?: string }) => {
    return Request({
      url: `/users/${params.id}`,
      method: 'get',
      params: {
        include: params.include,
      },
    });
  },

  updateAvatar: (params: { url: string }) => {
    return Request({
      url: '/user/avatar',
      method: 'post',
      params: {
        avatar_url: params.url,
      },
    });
  },

  updateCover: (params: { url: string }) => {
    return Request({
      url: '/user/cover',
      method: 'post',
      params: {
        cover_url: params.url,
      },
    });
  },

  changeProfile: (params: { nickname?: string; headline?: string }) => {
    return Request({
      url: '/user/changeProfile',
      method: 'post',
      params: params,
    });
  },

  changeMobile: (params: { mobile: string }) => {
    return Request({
      url: '/user/changeMobile',
      method: 'post',
      params: params,
    });
  },

  changePsd: (params: { oldPassword: string; newPassword: string }) => {
    return Request({
      url: '/user/changePsd',
      method: 'post',
      params: params,
    });
  },

  resetPsd: (params: { mobile: string; smscode: string; password: string }) => {
    return Request({
      url: '/user/resetPsd',
      method: 'post',
      params: params,
    });
  },

  // 关注用户
  followUser: (params: { user_id: string; following_state: boolean }) => {
    const method = params.following_state ? 'delete' : 'put';
    return Request({
      url: `/users/following/${params.user_id}`,
      method,
    });
  },

  // 关注的用户列表
  getUserFollowing: (params: {
    user_id: string;
    page?: number;
    per_page?: number;
  }) => {
    return Request({
      url: `/users/${params.user_id}/following`,
      method: 'get',
      params: {
        page: params.page,
        per_page: params.per_page,
      },
    });
  },

  // 用户的粉丝列表
  getUserFollowers: (params: {
    user_id: string;
    page?: number;
    per_page?: number;
  }) => {
    return Request({
      url: `/users/${params.user_id}/followers`,
      method: 'get',
      params: {
        page: params.page,
        per_page: params.per_page,
      },
    });
  },
};
