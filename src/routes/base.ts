const BaseRoutes = [
  {
    exact: true,
    name: '首页',
    title: 'menu.home',
    key: 'home',
    path: '/',
    component: '@/pages/home/index',
  },
  {
    name: '搜索结果',
    title: 'menu.search.result',
    key: 'search',
    path: 'search',
    isHide: true,
    component: '@/pages/search/_layout',
  },
  {
    name: '发布',
    title: 'menu.publish',
    key: 'publish',
    path: 'publish/:publishType',
    isHide: true,
    component: '@/pages/account/publish',
  },
  {
    name: '编辑',
    title: 'menu.edit',
    key: 'edit',
    path: 'edit/:publishType/:id',
    isHide: true,
    component: '@/pages/account/publish',
  },

  // 其他
  {
    name: '帮助中心',
    title: 'menu.help',
    key: 'help',
    path: 'help',
    isHide: true,
    component: '@/pages/other/help',
  },
  {
    name: '服务条款',
    title: 'menu.service',
    key: 'service',
    path: 'service',
    isHide: true,
    component: '@/pages/other/service',
  },
  {
    name: '联系我们',
    title: 'menu.contact',
    key: 'contact',
    path: 'contact',
    isHide: true,
    component: '@/pages/other/contact',
  },
  {
    name: '网站地图',
    title: 'menu.sitemap',
    key: 'sitemap',
    path: 'sitemap',
    isHide: true,
    component: '@/pages/other/sitemap',
  },
];

export default BaseRoutes;
