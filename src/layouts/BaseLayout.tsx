import { useLocation } from 'umi';
import GlobalHeader from '@/components/Common/global-header';
import GlobalFooter from '@/components/Common/global-footer';
import GlobalContent from '@/components/Common/global-content';

function BaseLayout(props) {
  const location = useLocation();
  return (
    <div>
      <GlobalHeader navData={[]} pathname={location.pathname} />
      <GlobalContent>{props.children}</GlobalContent>
      <GlobalFooter />
    </div>
  );
}

export default BaseLayout;
