/**
 * 账户 - 圈子
 */
import { useSelector } from 'umi';
import { IRootState } from '@/models';
import { Row, Col } from 'antd';

import UserCircleListQuery from '@/blocks/circle/user-circle-list-query';

const AccountCircle = () => {
  const userDetail = useSelector((state: IRootState) => state.user.userDetail);

  return (
    <Row>
      <Col xs={0} sm={0} md={4} lg={6} />

      <Col xs={24} sm={24} md={16} lg={12}>
        <UserCircleListQuery userId={userDetail._id} />
      </Col>

      <Col xs={0} sm={0} md={4} lg={6} />
    </Row>
  );
};

export default AccountCircle;
