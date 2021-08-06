/**
 * 表单 - 手机号
 */
import React, { useState } from 'react';
import { Input } from 'antd';
import { Validator } from 'metu-ui/dist/utils/index';

interface IProps {
  initialValue?: string;
  callback: (value: string, err?: string) => void;
  autoFocus?: boolean;
}

const InputMobile = (props: IProps) => {
  const { initialValue, callback, autoFocus } = props;

  const [value, setValue] = useState(initialValue);

  // 监控手机号输入
  const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (value.length === 1 && value !== '1') value = '';
    value = value.replace(/\D/g, '');
    setValue(value);
    if (Validator.checkMobile(value)) {
      callback(value);
    } else {
      callback(value, '请输入正确的手机号');
    }
  };

  // 手机失焦检测
  const mobileOnBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (value) {
      if (Validator.isMobile(value)) {
        callback(value);
      } else {
        callback(value, '请输入正确的手机号');
      }
    } else {
      callback(value, '请输入手机号');
    }
  };

  return (
    <Input
      size="large"
      maxLength={11}
      autoFocus={autoFocus}
      autoComplete="off"
      placeholder="手机号"
      onChange={changeValue}
      onBlur={mobileOnBlur}
      value={value}
      allowClear={true}
    />
  );
};

export default InputMobile;
