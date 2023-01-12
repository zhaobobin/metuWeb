import { useState } from 'react';
import { useIntl } from 'umi';
import { Tabs } from 'antd';
import PhotoListQuery from '@/blocks/photo/photo-list-query';
import styles from './home-photo-list.less';

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

  const tabItems = [
    {
      key: 'popular',
      label: '热门',
      children: state.category === 'popular' && (
        <PhotoListQuery {...queryOption} />
      ),
    },
    {
      key: 'editor',
      label: '推荐',
      children: state.category === 'editor' && (
        <PhotoListQuery {...queryOption} />
      ),
    },
    {
      key: 'new',
      label: '最新',
      children: state.category === 'new' && <PhotoListQuery {...queryOption} />,
    },
  ];

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
          items={tabItems}
        />
      </div>
    </div>
  );
};

export default HomePhotoList;
