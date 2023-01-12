/**
 * 设置 - 菜单
 */
import { NavLink, useIntl } from 'umi';
import { RightOutlined } from '@ant-design/icons';
import styles from './slide-menu.less';

interface IProps {
  routes: any;
}

const SettingsSlideMenu = ({ routes }: IProps) => {
  const intl = useIntl();

  return (
    <div className={styles.menu}>
      <ul>
        {routes.children.map((item) => (
          <li key={item.path}>
            <NavLink
              activeClassName={styles.active}
              to={`/${routes.path}/${item.path}`}
            >
              <span>{intl.formatMessage({ id: item.id })}</span>
              <RightOutlined />
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SettingsSlideMenu;
