const UserRoutes = [
  {
    exact: false,
    path: '/user',
    isHide: true,
    component: '@/pages/user/_layout',
    routes: [
      {
        exact: true,
        path: '/user',
        redirect: '/user/login',
      },
      {
        name: '用户登录',
        title: 'menu.user.login',
        path: '/user/login',
        component: '@/pages/user/login',
      },
      {
        name: '用户注册',
        title: 'menu.user.register',
        path: '/user/register',
        component: '@/pages/user/register',
      },
      {
        exact: true,
        path: '/user/reset',
        redirect: '/user/reset/index',
      },
      {
        name: '找回密码',
        title: 'menu.user.reset',
        path: '/user/reset/:step',
        component: '@/pages/user/reset',
      },
      { component: '@/pages/other/404' },
    ],
  },
];

export default UserRoutes;
