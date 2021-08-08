const MessagesRoutes = [
  {
    name: '消息中心',
    title: 'menu.user.messages',
    key: 'messages',
    path: 'messages',
    component: '@/pages/messages/_layout',
    children: [
      {
        name: '点赞',
        title: 'menu.user.messages.favor',
        key: 'favor',
        path: 'favor',
        component: '@/pages/messages/messages-favor',
      },
      {
        name: '评论',
        title: 'menu.user.messages.comment',
        key: 'comment',
        path: 'comment',
        component: '@/pages/messages/messages-comment',
      },
      {
        name: '关注',
        title: 'menu.user.messages.follow',
        key: 'follow',
        path: 'follow',
        component: '@/pages/messages/messages-follow',
      },
      {
        name: '收藏',
        title: 'menu.user.messages.collect',
        key: 'collect',
        path: 'collect',
        component: '@/pages/messages/messages-collect',
      },
      {
        name: '私信',
        title: 'menu.user.messages.mail',
        key: 'mail',
        path: 'mail',
        component: '@/pages/messages/messages-mail',
      },
      {
        name: '通知',
        title: 'menu.user.messages.notify',
        key: 'motify',
        path: 'notify',
        component: '@/pages/messages/messages-notify',
      },
    ],
  },
];

export default MessagesRoutes;
