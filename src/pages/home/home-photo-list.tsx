import { useState, useEffect } from 'react';
import { useIntl } from 'umi';
import { Tabs } from 'antd';
import PhotoListQuery from '@/blocks/photo/photo-list-query';
import styles from './home-photo-list.less';

const TabPane = Tabs.TabPane;

interface IState {
  category: string;
}

const HomePhotoList = () => {
  const intl = useIntl();

  const initialState: IState = {
    category: 'popular',
  };

  const [state, setState] = useState(initialState);

  const handleTab = (category) => {
    setState({ ...state, category });
  };

  const { category } = state;

  const queryOption = {
    category,
    per_page: 12, //每页数量
    maxQueryPage: 1, //最大页数
  };

  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <h1>{intl.formatMessage({ id: 'home.photo.title' })}</h1>
        <p>{intl.formatMessage({ id: 'home.photo.desc1' })}</p>
        <p>{intl.formatMessage({ id: 'home.photo.desc2' })}</p>
      </div>
      <div className={styles.body}>
        <Tabs
          defaultActiveKey={category}
          animated={false}
          centered
          onChange={handleTab}
        >
          <TabPane tab="热门" key="popular">
            {category === 'popular' ? (
              <PhotoListQuery {...queryOption} />
            ) : null}
          </TabPane>

          <TabPane tab="推荐" key="editor">
            {category === 'editor' ? <PhotoListQuery {...queryOption} /> : null}
          </TabPane>

          <TabPane tab="最新" key="new">
            {category === 'new' ? <PhotoListQuery {...queryOption} /> : null}
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default HomePhotoList;
