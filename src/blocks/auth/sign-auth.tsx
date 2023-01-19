/**
 * 登录校验 - 点击触发
 */
import React, { forwardRef, useImperativeHandle } from 'react';
import { useSelector, useDispatch } from 'umi';
import { IRootState } from '@/models/index';

export interface SignAuthRef {
  check: Function;
}

interface IProps {
  children?: React.ReactNode;
  callback?: (isAuth: boolean) => void;
}

const SignAuth = (props: IProps, ref) => {
  const dispatch = useDispatch();

  const isAuth = useSelector((state: IRootState) => state.account.isAuth);

  let flag: boolean = true;

  useImperativeHandle(ref, () => ({
    check,
  }));

  const check = () => {
    if (isAuth) {
      if (props.callback) {
        props.callback(isAuth);
        return false;
      } else {
        return isAuth;
      }
    } else {
      showSignModal();
      return false;
    }
  };

  // 显示登录Modal
  const showSignModal = () => {
    if (!flag) {
      return;
    }
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

export default forwardRef(SignAuth);
