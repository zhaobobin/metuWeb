/**
 * 导航
  首页 www.metuwang.com
    -- 社区 /community 推荐阅读：关注、订阅、收藏等
        -- 发现 /community/discover 图片photo、视频video、影集album、图文graphic
        -- 摄影师 /community/author
        -- 圈子 /community/cricle
    -- 活动 /contest
    -- 教程 /course (废弃)
    -- 问答 /question
    -- 器材 /equipments
    -- 话题 /topics
    -- 百科 /baike
    图库 photos.metuwang.com
 */
import BaseRoutes from './base';
import CommunityRoutes from './community';
import AccountRoutes from './account';
import SettingsRoutes from './settings';
import MessagesRoutes from './messages';
import UserRoutes from './user';

// nav data
export default [
  {
    exact: false,
    path: '/',
    component: '@/layouts/index',
    routes: [
      ...BaseRoutes,
      ...CommunityRoutes,
      ...AccountRoutes,
      ...SettingsRoutes,
      ...MessagesRoutes,
      ...UserRoutes,
      { component: '@/pages/other/404' },
    ],
  },
];
