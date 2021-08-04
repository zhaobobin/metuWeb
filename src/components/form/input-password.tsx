/**
 * 表单 - 密码
 */
import React, { useState } from 'react';
import { Input } from 'antd';
import { Validator } from 'metu-ui/dist/utils/index';
import styles from './input-password.less';

interface IProps {
  defaultValue?: string;
  callback: (value: string, msg?: string) => void;
  showPsdLevel?: boolean;
  placeholder?: string;
}

const InputPassword = (props: IProps) => {
  const { defaultValue, callback, showPsdLevel, placeholder } = props;
  const minLength = 6;
  const maxLength = 20;

  const [state, setState] = useState({
    value: defaultValue,
    psdLevel: '',
    psdLevelVisible: false,
    psdLevelStyle: null,
  });

  //监控输入值
  const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/ /g, '');
    checkPsd(value);
    callback(value);
  };

  // 焦点
  const onFocus = () => {
    changePsdLevelVisible();
  };

  // 失焦
  const onBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/ /g, '');

    if (value) {
      if (value.length < minLength) {
        callback(value, `密码长度不能小于${minLength}位`);
      }
      if (value.length > maxLength) {
        callback(value, `密码长度不能大于${maxLength}位`);
      }
    } else {
      callback(value, '请输入密码');
    }

    if (showPsdLevel) {
      changePsdLevelVisible();
    }
  };

  //切换密码框显示
  const changePsdLevelVisible = () => {
    let psdLevelVisible = !state.psdLevelVisible;
    setState({
      ...state,
      psdLevelVisible,
    });
  };

  const checkPsd = (value) => {
    let psdLevel, psdLevelStyle;
    if (value) {
      let psdModes = Validator.checkPsdLevel(value);
      switch (psdModes) {
        case 1:
          psdLevel = '';
          psdLevelStyle = '';
          break;
        case 2:
          psdLevel = '弱';
          psdLevelStyle = styles.psdLevelError;
          break;
        case 3:
          psdLevel = '中';
          psdLevelStyle = styles.psdLevelMiddle;
          break;
        case 4:
          psdLevel = '强';
          psdLevelStyle = styles.psdLevelStrong;
          break;
        default:
          psdLevel = '';
          psdLevelStyle = '';
          break;
      }
    }
    setState({
      ...state,
      value,
      psdLevel,
      psdLevelStyle,
    });
  };
  const { value, psdLevel, psdLevelStyle } = state;

  const psdLevelVisible = showPsdLevel ? state.psdLevelVisible : false;

  return (
    <div className={styles.container}>
      <Input.Password
        size="large"
        autoComplete="off"
        minLength={minLength}
        maxLength={maxLength}
        placeholder={placeholder || '密码'}
        onChange={changeValue}
        onFocus={onFocus}
        onBlur={onBlur}
        value={value}
        allowClear={true}
      />
      {psdLevelVisible && value ? (
        <div className={styles.psdStatus + ' ' + psdLevelStyle}>
          <p className={styles.box}>
            <span className={styles.line}>
              <em className={styles.block} />
            </span>
            <span className={styles.line}>
              <em className={styles.block} />
            </span>
            <span className={styles.line}>
              <em className={styles.block} />
            </span>
            <span className={styles.text}>{psdLevel}</span>
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default InputPassword;
