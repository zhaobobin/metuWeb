/**
 * 二级导航菜单 - 自动吸顶
 */
import { NavLink } from 'umi';
import { FormattedMessage } from 'react-intl';
import styles from './SubMenu.less';

interface IProps {
  routes: any;
}

const SubMenu = ({ routes }: IProps) => {

  return(
    <ul className={styles.container}>
      {
        routes.children.map((item, index) => (
          <li key={index} className={styles.item}>
            {
              item.isHide ?
                null
                :
                <NavLink
                  activeClassName={styles.active}
                  to={`/${routes.key}/${item.path}`}
                >
                  <FormattedMessage id={item.id}/>
                </NavLink>
            }
          </li>
        ))
      }
    </ul>
  )

}

export default SubMenu;
