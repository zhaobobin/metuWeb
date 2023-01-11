/**
 * 登录校验 - 点击触发
 */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'umi';
import { IRootState } from '@/models/index';

interface IProps {
  onRef: (t: any) => void;
  children?: React.ReactNode;
  callback?: (isAuth: boolean) => void;
}

const SignAuth = (props: IProps) => {
  const dispatch = useDispatch();

  const isAuth = useSelector((state: IRootState) => state.account.isAuth);

  let flag: boolean = true;

  useEffect(() => {
    props.onRef(this);
  }, []);

  const check = () => {
    if (isAuth) {
      if (props.callback) {
        props.callback(isAuth);
      } else {
        return isAuth;
      }
    } else {
      showSignModal();
    }
  };

  // 显示登录Modal
  const showSignModal = () => {
    if (!flag) return;
    flag = false;

    dispatch({
      type: 'global/changeSignModal',
      payload: {
        signModalVisible: true,
        signTabKey: '1',
      },
    });

    setTimeout(() => {
      flag = true;
    }, 500);
  };

  return <span>{props.children}</span>;
};

export default SignAuth;
