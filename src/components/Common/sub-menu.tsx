/**
 * 二级导航菜单 - 自动吸顶
 */
import { NavLink, useIntl } from 'umi';
import styles from './sub-menu.less';

interface IProps {
  routes: any;
}

const SubMenu = ({ routes }: IProps) => {
  const intl = useIntl();
  return (
    <ul className={styles.container}>
      {routes.children.map((item, index) => (
        <li key={index} className={styles.item}>
          {item.isHide ? null : (
            <NavLink
              activeClassName={styles.active}
              to={`/${routes.key}/${item.path}`}
            >
              {intl.formatMessage({ id: item.title })}
            </NavLink>
          )}
        </li>
      ))}
    </ul>
  );
};

export default SubMenu;
