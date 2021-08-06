/**
 * 表单 - 图形验证码
 */
import React, { useState } from 'react';
import { Checkbox } from 'antd';
import { ArticleAlert } from '@/components/dialog/dialog';

interface IProps {
  callback: (checked: boolean) => void;
}

interface IState {
  title: string;
  checked: boolean;
}

const FormXieyi = (props: IProps) => {
  const initialState: IState = {
    title: '迷图网用户注册协议',
    checked: true,
  };
  const [state, setState] = useState(initialState);

  const xieyiChecked = () => {
    let checked = !state.checked;
    setState({
      ...state,
      checked,
    });
    props.callback(checked);
  };

  const showXieyi = () => {
    ArticleAlert({
      title: state.title,
      msg: '<p>迷图网用户注册协议</p>',
      btns: ['确定'],
      callback: () => {},
    });
  };

  return (
    <span>
      <Checkbox checked={state.checked} onChange={xieyiChecked}>
        已阅读并同意
      </Checkbox>
      <a onClick={showXieyi}>《{state.title}》</a>
    </span>
  );
};

export default FormXieyi;
