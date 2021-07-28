/**
 * 设置 - 菜单
 */
import React from 'react';
import { NavLink } from 'umi';
import { Drawer } from 'antd';
import { CloseOutlined, MenuOutlined, RightOutlined } from '@ant-design/icons';
import { FormattedMessage } from 'react-intl';
import styles from './SlideDrawer.less';

interface IProps {
  routes: any;
  title: string;
}

interface IState {
  visible: boolean;
}

export default class SettingsSlideDrawer extends React.Component<IProps, IState> {

  constructor(props){
    super(props);
    this.state = {
      visible: false
    }
  }

  toggle = () => {
    let visible = !this.state.visible;
    this.setState({
      visible,
    });
  }

  render(){

    const { routes, title } = this.props;
    const { visible } = this.state;

    return(
      <div className={styles.drawer}>

        <div
          className={styles.btn + ' ' + (visible ? styles.close : styles.show)}
          onClick={this.toggle}
        >
          {
            visible ?
              <CloseOutlined />
              :
              <MenuOutlined />
          }
        </div>

        <Drawer
          title={title}
          placement="left"
          closable={false}
          visible={visible}
          className={styles.settingsDrawer}
          onClose={this.toggle}
        >
          <ul>
            {
              routes.children.map(item => (
                <li
                  key={item.path}
                  onClick={this.toggle}
                >
                  <NavLink
                    activeClassName={styles.active}
                    to={`/${routes.path}/${item.path}`}
                  >
                    <FormattedMessage id={item.id}/>
                    <RightOutlined />
                  </NavLink>
                </li>
              ))
            }
          </ul>
        </Drawer>

      </div>
    )
  }

};
