const CommunityRoutes = [
  {
    exact: true,
    name: '社区',
    title: 'menu.community',
    key: 'community',
    path: '/community',
    isHide: true,
    component: '@/pages/community/index',
  },
  {
    name: '发现',
    title: 'menu.community.discover',
    key: 'discover',
    path: '/community/discover',
    component: '@/pages/community/discover',
  },
  {
    name: '摄影师',
    title: 'menu.community.author',
    key: 'author',
    path: '/community/author',
    isHide: true,
    component: '@/pages/community/author',
  },
  {
    name: '圈子',
    title: 'menu.community.circle',
    key: 'circle',
    path: '/community/circle',
    isHide: false,
    component: '@/pages/community/circle',
  },
  {
    name: '圈子详情',
    title: 'menu.community.circle.detail',
    key: 'circle-detail',
    path: 'community/circle/detail/:id',
    isHide: true,
    component: '@/pages/community/circle-detail',
  },
  {
    name: '创建圈子',
    title: 'menu.community.circle.create',
    key: 'circle-detail',
    path: 'community/circle/create',
    isHide: true,
    component: '@/pages/community/circle-create',
  },
  {
    name: '照片详情',
    title: 'menu.photo.detail',
    key: 'photo',
    path: 'photos/:id/:title',
    isHide: true,
    component: '@/pages/detail/photo-detail',
  },
  {
    name: '图文详情',
    title: 'menu.article.detail',
    key: 'article',
    path: 'graphic/:id/:title',
    isHide: true,
    component: '@/pages/detail/article-detail',
  },
];

export default CommunityRoutes;