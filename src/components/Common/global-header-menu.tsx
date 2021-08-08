import { NavLink, useIntl } from 'umi';
import styles from './global-header-menu.less';

const getMenuList = (navData: any[]) => {
  if (!navData) {
    return [];
  }
  const intl = useIntl();
  const menus = navData.filter((nav) => nav.menuShow);
  return menus.map((item) => {
    if (!item.name || item.isHide) return null;
    return (
      <li key={item.key}>
        <NavLink
          exact={item.exact}
          className={styles.link}
          activeClassName={styles.current}
          to={`${item.path}`}
        >
          {intl.formatMessage({ id: item.title })}
        </NavLink>

        {item.children && (
          <div className={styles.submenu}>
            {item.children.map((topic) =>
              topic.isHide ? null : (
                <p key={topic.key}>
                  <NavLink
                    className={styles.sublink}
                    activeClassName={styles.active}
                    to={`${item.path}/${topic.path}`}
                  >
                    {intl.formatMessage({ id: topic.title })}
                  </NavLink>
                </p>
              ),
            )}
          </div>
        )}
      </li>
    );
  });
};

const GlobalHeaderMenu = ({ navData }) => {
  return <ul className={styles.menu}>{getMenuList(navData)}</ul>;
};

export default GlobalHeaderMenu;
