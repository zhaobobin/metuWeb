const SettingsRoutes = [
  {
    name: '用户设置',
    title: 'menu.user.settings',
    key: 'settings',
    path: 'settings',
    isHide: true,
    component: '@/pages/settings/_layout',
    children: [
      {
        name: '帐号绑定',
        title: 'menu.user.settings.bind',
        key: 'bind',
        path: 'bind',
        component: '@/pages/settings/settings-bind',
      },
      {
        name: '个人信息',
        title: 'menu.user.settings.profile',
        key: 'profile',
        path: 'profile',
        component: '@/pages/settings/settings-profile',
      },
      {
        name: '消息提醒',
        title: 'menu.user.settings.message',
        key: 'message',
        path: 'message',
        component: '@/pages/settings/settings-message',
      },
      {
        name: '偏好设置',
        title: 'menu.user.settings.preference',
        key: 'preference',
        path: 'preference',
        component: '@/pages/settings/settings-preference',
      },
      {
        name: '实名认证',
        title: 'menu.user.settings.authenticate',
        key: 'authenticate',
        path: 'authenticate',
        component: '@/pages/settings/settings-authenticate',
      },
    ]
  },
];

export default SettingsRoutes;
