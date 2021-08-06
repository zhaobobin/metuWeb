import { history, useParams } from 'umi';
import { Row, Col } from 'antd';

import PsdReset from '@/blocks/User/psd-reset';

const Reset = () => {
  const params: { step: string } = useParams();

  // 找回密码回调
  const resetCallback = () => {
    history.push('/user/login');
  };

  const style = {
    margin: '25px auto',
    padding: '30px',
    background: '#fff',
  };

  return (
    <div>
      <Row>
        <Col xs={1} sm={1} md={4} lg={6} />
        <Col xs={22} sm={22} md={16} lg={12}>
          <div style={style}>
            <PsdReset step={params.step} callback={resetCallback} />
          </div>
        </Col>
        <Col xs={1} sm={1} md={4} lg={6} />
      </Row>
    </div>
  );
};

export default Reset;
