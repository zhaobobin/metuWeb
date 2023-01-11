/**
 * 消息 - 内容：点赞、评论、关注、作品
 */
import { useState } from 'react';
import { Link } from 'umi';
import { Tabs } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import styles from './MessagesPopoverContent.less';

import MessagesList from '@/blocks/Messages/MessagesList';

const { TabPane } = Tabs;

const MessagesPopoverContent = () => {
  const initialState = {
    tabKey: '0',
    tabs: [
      {
        type: 'favor',
        label: '点赞',
      },
      {
        type: 'comment',
        label: '评论',
      },
      {
        type: 'follow',
        label: '关注',
      },
      {
        type: 'collect',
        label: '收藏',
      },
      {
        type: 'mail',
        label: '私信',
      },
      {
        type: 'notify',
        label: '通知',
      },
    ],
  };

  const [state, setState] = useState(initialState);

  const onChangeTab = (key) => {
    setState({
      ...state,
      tabKey: key,
    });
  };

  const { tabKey, tabs } = state;

  return (
    <div className={styles.container}>
      <Tabs
        defaultActiveKey={tabKey}
        // tabPosition="left"
        animated={{ tabPane: false }}
        onChange={onChangeTab}
      >
        {tabs.map((item, index) => (
          <TabPane tab={item.label} key={index}>
            <div className={styles.content}>
              {item.type === tabs[tabKey].type ? (
                <MessagesList type={tabs[tabKey].type} />
              ) : null}
            </div>
          </TabPane>
        ))}
      </Tabs>

      <div className={styles.foot}>
        <Link to="/settings/message" className={styles.settings}>
          <SettingOutlined />
          <span>设置</span>
        </Link>
        <Link to={`/messages/${tabs[tabKey].type}`} className={styles.all}>
          <span>查看全部{tabs[tabKey].label}</span>
        </Link>
      </div>
    </div>
  );
};

export default MessagesPopoverContent;
