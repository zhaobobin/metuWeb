import { defineConfig } from 'umi';
import ENV from './src/config/env';
import routes from './src/routes/index';
import theme from './src/theme/theme';

export default defineConfig({
  publicPath: '/public/',
  favicon: '/public/images/favicon.png',
  title: '迷图网',
  metas: [
    {
      name: 'keywords',
      content:
        '摄影,摄影师,视觉摄影,摄影社区,摄影作品,摄影技巧,摄影活动,摄影圈子,摄影图片,迷图网',
    },
    {
      name: 'description',
      content:
        '迷图网(www.metuwang.com)，是一个致力于摄影分享、发现、售卖的专业平台，来自世界各地的摄影师是我们忠实的用户。让你与他人因图片相识，世界那么大，我想去看看。',
    },
    {
      name: 'Author',
      content: '迷图网(www.metuwang.com)',
    },
    {
      name: 'Owner',
      content: '迷图网(www.metuwang.com)',
    },
    {
      name: 'baidu-site-verification',
      content: '',
    },
  ],
  nodeModulesTransform: {
    type: 'none',
  },
  routes: routes,
  theme: theme,
  fastRefresh: {},
  dynamicImport: {
    loading: '@/pages/other/Loading',
  },
  chainWebpack(config) {
    config
      .plugin('open-browser-webpack-plugin')
      .use('open-browser-webpack-plugin', [{ url: 'http://localhost:8000' }]);
  },
  // mfsu: {},
  dva: {
    immer: false,
    hmr: true,
  },
  locale: {
    default: 'zh-CN',
    antd: true,
    title: true,
    baseNavigator: true,
    baseSeparator: '-',
  },
  proxy: {
    '/api': {
      target: ENV.api.test,
      changeOrigin: true,
    },
  },
});
