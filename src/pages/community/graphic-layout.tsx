/**
 * Graphic 图文
 */
import { Row, Col } from 'antd';
import styles from './graphic-layout.less';

import ArticleListQuery from '@/blocks/article/article-list-query';
import ArticleSearch from '@/blocks/article/article-search';
import ArticleRank from '@/blocks/article/article-rank';
import TagsRank from '@/blocks/tags/tags-rank';

const GraphicLayout = () => {
  return (
    <div className={styles.container}>
      <Row>
        <Col xs={0} sm={0} md={3} lg={5} />

        <Col xs={24} sm={24} md={18} lg={14}>
          <Row className={styles.bg}>
            <Col xs={24} sm={24} md={24} lg={17}>
              <div className={styles.content}>
                <ArticleSearch />
                <ArticleListQuery url="/articles" />
              </div>
            </Col>
            <Col xs={24} sm={24} md={24} lg={7}>
              <div className={styles.slide}>
                <ArticleRank />
                <TagsRank />
              </div>
            </Col>
          </Row>
        </Col>

        <Col xs={0} sm={0} md={3} lg={5} />
      </Row>
    </div>
  );
};

export default GraphicLayout;
