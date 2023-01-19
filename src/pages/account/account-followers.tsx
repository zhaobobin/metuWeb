/**
 * 账户 - 粉丝
 */
import { useEffect, useState } from 'react';
import { useSelector, history, useDispatch } from 'umi';
import { Row, Col } from 'antd';
import { IRootState } from '@/models';

const AccountFollowers = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(
    (state: IRootState) => state.account.currentUser,
  );
  const userDetail = useSelector((state: IRootState) => state.user.userDetail);

  let ajaxFlag = true;

  const initialState = {
    loading: true,
    list: '',
    count: 0,
  };
  const [state, setState] = useState(initialState);

  useEffect(() => {
    queryList(userDetail._id);
  }, []);

  const queryList = (_id: string) => {
    if (!ajaxFlag) return;
    ajaxFlag = false;

    dispatch({
      type: 'global/request',
      url: `/users/${_id}/followers`,
      method: 'get',
      payload: {},
      callback: (res) => {
        setTimeout(() => {
          ajaxFlag = true;
        }, 500);
        if (res.code === 0) {
          setState({
            loading: false,
            list: res.data.list,
            count: res.data.count,
          });
        } else {
          history.push('/404');
        }
      },
    });
  };

  return (
    <Row>
      <Col xs={0} sm={0} md={4} lg={6} />

      <Col xs={24} sm={24} md={16} lg={12}>
        粉丝
      </Col>

      <Col xs={0} sm={0} md={4} lg={6} />
    </Row>
  );
};

export default AccountFollowers;
