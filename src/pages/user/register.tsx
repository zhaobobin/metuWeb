import { history } from 'umi';
import { Row, Col } from 'antd';

import UserRegister from '@/blocks/user/user-register';

const Login = () => {
  // 登录回调
  const registerCallback = () => {
    history.push('/');
  };

  const style = {
    width: '430px',
    margin: '25px auto 0',
    padding: '30px',
    background: '#fff',
  };

  return (
    <div>
      <Row>
        <Col xs={0} sm={0} md={4} lg={6} />
        <Col xs={24} sm={24} md={16} lg={12}>
          <div style={style}>
            <UserRegister callback={registerCallback} />
          </div>
        </Col>
        <Col xs={0} sm={0} md={4} lg={6} />
      </Row>
    </div>
  );
};

export default Login;
