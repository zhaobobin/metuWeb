import { defineConfig } from 'umi';
import navData from './src/routes/index';
import theme from './src/theme/theme';
import ENV from './src/config/env';

let proxyApi;
switch (process.env.X_ENV) {
  case 'dev':
    proxyApi = ENV.api.dev;
    break;
  case 'pro':
    proxyApi = ENV.api.pro;
    break;
  default:
    proxyApi = ENV.api.pro;
}

export default defineConfig({
  outputPath: './dist/www/',
  publicPath: '/',
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
  routes: [navData],
  theme: theme,
  fastRefresh: {},
  dynamicImport: {
    loading: '@/pages/other/Loading',
  },
  // chainWebpack(config) {
  //   config
  //     .plugin('open-browser-webpack-plugin')
  //     .use('open-browser-webpack-plugin', [{ url: 'http://localhost:8000' }]);
  // },
  // mfsu: {},
  dva: {
    immer: false,
    hmr: true,
    disableModelsReExport: true,
    lazyLoad: true,
  },
  locale: {
    default: 'zh-CN',
    antd: true,
    title: true,
    baseNavigator: true,
    baseSeparator: '-',
  },
  externals: {
    BMap: 'BMap',
    BMapLib: 'BMapLib',
    g2: 'G2',
    'g-cloud': 'Cloud',
    'g2-plugin-slider': 'G2.Plugin.slider',
  },
  proxy: {
    '/api': {
      target: proxyApi,
      changeOrigin: true,
    },
  },
});
