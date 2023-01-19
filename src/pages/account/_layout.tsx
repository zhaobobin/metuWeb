import { useEffect } from 'react';
import {
  useDispatch,
  useSelector,
  useParams,
  useLocation,
  NavLink,
  useIntl,
  Redirect,
} from 'umi';
import { Affix } from 'antd';
import { IRootState } from '@/models';
import styles from './_layout.less';

import AccountHeaderCover from '@/blocks/account/account-header-cover';
import AccountHeaderInfo from '@/blocks/account/account-header-info';

import RouteExtend from '@/components/common/route-extend';
const accountRoute = RouteExtend('users');

export default function _layout(props) {
  const intl = useIntl();
  const dispatch = useDispatch();
  const params = useParams<{ username: string }>();
  const location = useLocation();
  const userDetail = useSelector((state: IRootState) => state.user.userDetail);

  useEffect(() => {
    queryUserDetail(params.username);
  }, []);

  const queryUserDetail = (username: string) => {
    dispatch({
      type: 'user/queryUserDetail',
      payload: {
        username,
      },
    });
  };

  const renderMenu = () => {
    return (
      <ul className={styles.accountMenu}>
        {accountRoute?.routes &&
          accountRoute.routes.map((item) => {
            if (item.isHide) {
              return null;
            }
            return (
              <li key={item.key} className={styles.item}>
                <NavLink
                  activeClassName={styles.active}
                  to={`/${accountRoute.key}/${params.username}/${item.path}`}
                >
                  {intl.formatMessage({ id: item.title })}
                </NavLink>
              </li>
            );
          })}
      </ul>
    );
  };

  if (location.pathname.split('/').length < 4) {
    return (
      <Redirect
        exact
        from={`/${accountRoute?.key}/${params.username}`}
        to={`/${accountRoute?.key}/${params.username}/photos`}
      />
    );
  }

  if (!userDetail._id) {
    return null;
  }

  return (
    <div className={styles.accountLayout}>
      <AccountHeaderCover />

      <AccountHeaderInfo />

      <Affix>{renderMenu}</Affix>

      <div className={styles.accountContent}>{props.children}</div>
    </div>
  );
}
