/**
 * 嵌套路由 - 返回对应分类的路由数组
 * category [String] 传入父级分类的key
 */
import navData from '@/routes/index';
const routes = navData.routes;

export default function RouteExtend(category: string) {
  const routeRecord = routes?.find((item) => item.key === category);
  if (routeRecord) {
    return routeRecord;
  } else {
    return null;
  }
}
