import { useEffect } from 'react';
import { useDispatch, useLocation } from 'umi';
import GlobalHeader from '@/components/common/global-header';
import GlobalFooter from '@/components/common/global-footer';
import GlobalContent from '@/components/common/global-content';
import nav from '@/routes/index';
import './index.less';

const Home = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const getToken = () => {
    dispatch({
      type: 'global/token',
    });
  };

  useEffect(() => {
    getToken();
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div>
      <GlobalHeader navData={nav[0].routes} pathname={location.pathname} />
      <GlobalContent>{props.children}</GlobalContent>
      <GlobalFooter />
    </div>
  );
};

export default Home;
