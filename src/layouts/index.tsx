import { useEffect } from 'react';
import { useDispatch, useLocation } from 'umi';
import GlobalHeader from '@/components/common/global-header';
import GlobalFooter from '@/components/common/global-footer';
import GlobalContent from '@/components/common/global-content';
import navData from '@/routes/index';
import './index.less';

const Layout = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const getToken = () => {
    if (location.pathname.includes('/user/')) {
      return;
    }
    dispatch({
      type: 'account/token',
    });
  };

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    if (!location.pathname.includes('users')) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return (
    <div>
      <GlobalHeader navData={navData.routes} pathname={location.pathname} />
      <GlobalContent>{props.children}</GlobalContent>
      <GlobalFooter />
    </div>
  );
};

export default Layout;
