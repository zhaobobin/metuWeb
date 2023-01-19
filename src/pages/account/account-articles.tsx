/**
 * 账户 - 文章
 */
import { useSelector } from 'umi';
import { IRootState } from '@/models';
import { Row, Col } from 'antd';

import ArticleListQuery from '@/blocks/article/article-list-query';

const AccountArticles = () => {
  const currentUser = useSelector(
    (state: IRootState) => state.account.currentUser,
  );
  const userDetail = useSelector((state: IRootState) => state.user.userDetail);

  const showEdit = currentUser._id === userDetail._id;
  const url = `/users/${userDetail._id}/articles`;

  return (
    <Row>
      <Col xs={0} sm={0} md={4} lg={6} />

      <Col xs={24} sm={24} md={16} lg={12}>
        <ArticleListQuery url={url} showEdit={showEdit} />
      </Col>

      <Col xs={0} sm={0} md={4} lg={6} />
    </Row>
  );
};

export default AccountArticles;
