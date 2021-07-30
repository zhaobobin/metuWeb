/**
 * 设置 - 菜单
 */
import { NavLink } from 'umi';
import { RightOutlined } from '@ant-design/icons';
import { FormattedMessage } from 'react-intl';
import styles from './slide-menu.less';

interface IProps {
  routes: any;
}

const SettingsSlideMenu = ({ routes }: IProps) => {
  return (
    <div className={styles.menu}>
      <ul>
        {routes.children.map((item) => (
          <li key={item.path}>
            <NavLink
              activeClassName={styles.active}
              to={`/${routes.path}/${item.path}`}
            >
              <FormattedMessage id={item.id} />
              <RightOutlined />
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SettingsSlideMenu;
