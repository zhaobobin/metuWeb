/**
 * Discover
 * 图片photo、视频video、影集album、图文graphic
 */
import { Affix, Menu } from 'antd';
import { Link, useIntl } from 'umi';
import { getUrlParams } from '@/utils/utils';
import styles from './Discover.less';

import GraphicLayout from './graphic-layout';
import PhotoLayout from './photo-layout';
import TagLayout from './tag-layout';

const Discover = () => {
  const intl = useIntl();

  const renderContent = (tab) => {
    const queryOption = {
      category: tab,
      per_page: 12, //每页数量
    };
    if (tab === 'graphic') {
      return <GraphicLayout />;
    }
    if (tab === 'tag') {
      return <TagLayout />;
    }
    return <PhotoLayout queryOption={queryOption} />;
  };

  const params: any = getUrlParams();
  const tab = params.t || 'popular';

  const menus = [
    { key: 'popular', id: 'menu.community.discover.popular', name: '热门' },
    { key: 'editor', id: 'menu.community.discover.editor', name: '推荐' },
    { key: 'new', id: 'menu.community.discover.new', name: '新作' },
    // { key: 'graphic', id: 'menu.community.discover.graphic', name: '图文' },
    // { key: "set", id: "menu.community.discover.set", name: "影集" },
    // { key: "story", id: "menu.community.discover.story", name: "专栏" },
    { key: 'tag', id: 'menu.community.discover.tag', name: '标签' },
  ];

  return (
    <div className={styles.container}>
      <Affix>
        <div className={styles.menus}>
          <Menu
            mode="horizontal"
            selectedKeys={[tab]}
            items={menus.map((item) => ({
              key: item.key,
              label: (
                <Link to={`/community/discover?t=${item.key}`}>
                  {intl.formatMessage({ id: item.id })}
                </Link>
              ),
            }))}
          />
        </div>
      </Affix>

      <div className={styles.content}>{renderContent(tab)}</div>
    </div>
  );
};

export default Discover;
