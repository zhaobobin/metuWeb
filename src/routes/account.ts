const AccountRoutes = [
  {
    exact: false,
    name: '账户中心',
    title: 'menu.users',
    key: 'users',
    path: 'users/:username',
    isHide: true,
    component: '@/pages/account/_layout',
    routes: [
      {
        name: '图片',
        title: 'menu.users.photos',
        key: 'photos',
        path: 'photos',
        component: '@/pages/account/account-photos',
      },
      {
        name: '文章',
        title: 'menu.users.articles',
        key: 'articles',
        path: 'articles',
        component: '@/pages/account/account-articles',
      },
      {
        name: '圈子',
        title: 'menu.users.circles',
        key: 'circles',
        path: 'circles',
        component: '@/pages/account/account-circle',
      },
      {
        name: '关注',
        title: 'menu.users.following',
        key: 'following',
        path: 'following',
        component: '@/pages/account/account-following',
      },
      {
        name: '点赞',
        title: 'menu.users.favoring',
        key: 'favoring',
        path: 'favoring',
        component: '@/pages/account/account-favoring',
      },
      {
        name: '收藏',
        title: 'menu.users.collecting',
        key: 'collecting',
        path: 'collecting',
        component: '@/pages/account/account-collecting',
      },
      {
        name: '简介',
        title: 'menu.users.detail',
        key: 'detail',
        path: 'detail',
        component: '@/pages/account/account-detail',
      },
      {
        name: '编辑个人资料',
        title: 'menu.account.edit',
        key: 'edit',
        path: 'edit',
        isHide: true,
        component: '@/pages/account/account-edit',
      },
    ],
  },
];

export default AccountRoutes;
