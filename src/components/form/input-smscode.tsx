/**
 * 表单 - 短信验证码
 * auto [String]    自动发送
 * mobile [String] 手机号
 * callback [Function] 返回输入值

 调用方式：
   <InputSmscode
     mobile={hasErrors(getFieldsError(['mobile'])) ? '' : getFieldValue('mobile')}
     callback={this.smscodeCallback}
   />

 回调函数：
 smscodeCallback = (value, err) => {
    //清空错误提示
    if(err === 'telError'){
      this.props.form.setFields({
        'mobile': {
          value: '',
          errors: [new Error('请输入手机号')]
        }
      });
    }
    else if(err === 'clearError'){
      this.props.form.setFields({
        'smscode': {
          value: '',
          errors: ''
        }
      });
    }
    else if(err === 'smscodeError'){
      this.props.form.setFields({
        'smscode': {
          value: '',
          errors: [new Error(!value ? '请输入短信验证码' : '短信验证码格式有误')]
        }
      });
    }
    else{
      this.props.form.setFieldsValue({'smscode': value});
      // this.props.form.validateFields(['smscode'], (err, values) => {});
    }
  };

 *
 */
import React, { useState, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Row, Col, Input } from 'antd';
import { Modal, Toast } from 'antd-mobile';
import { filterTel } from '@/utils/utils';
import { RootState } from '@/models/index';
import styles from './input-smscode.less';

import PintuValidate from '@/components/Form/PintuValidate';

const mapStateToProps = (state: RootState) => ({
  global: state.global,
});
const connector = connect(mapStateToProps);

interface IProps extends ConnectedProps<typeof connector> {
  auto?: boolean;
  type?: string;
  mobile: string;
  buttonStyle?: React.CSSProperties;
  callback: (value: string, err?: string) => void;
}

interface IState {
  value: string;
  maxLength: number;
  mobile: string;
  btnText: string;
  btnStyle: React.CSSProperties;
  num: number; //倒计时
  pintuNo?: number;
  modalVisible: boolean; //拼图
}

let timer;

const InputSmscode = (props: IProps) => {
  let ajaxFlag: boolean = true;
  const initialState: IState = {
    value: '',
    maxLength: 6,
    mobile: props.mobile,
    btnText: '获取验证码',
    btnStyle: styles.null,
    num: 60,
    pintuNo: new Date().getTime(),
    modalVisible: false, //拼图
  };
  const [state, setState] = useState(initialState);

  useEffect(() => {
    initBtnStyle(props.mobile);
    if (props.auto) {
      sendSmsCode();
    }
    return () => {
      clearInterval(timer);
    };
  }, [props.mobile]);

  //初始化按钮样式
  const initBtnStyle = (mobile: string) => {
    let { num } = state;
    let btnStyle = mobile
      ? num === 60
        ? styles.actived
        : state.btnStyle
      : num === 60
      ? styles.null
      : styles.disabled;
    setState({
      ...state,
      mobile,
      btnStyle,
    });
  };

  //改变输入值
  const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.replace(/\D/g, '');
    setState({ ...state, value });
    props.callback(value);
  };

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (value.length !== state.maxLength) {
      props.callback(value, 'smscodeError');
    }
  };

  //确定
  const submit = () => {
    let { mobile } = props;
    if (!mobile) {
      props.callback(mobile, 'mobileError');
      return;
    }

    if (state.btnStyle !== styles.actived) {
      return;
    }

    if (!ajaxFlag) return;
    ajaxFlag = false;
    setState({
      ...state,
      modalVisible: true,
    });
    setTimeout(() => {
      ajaxFlag = true;
    }, 500);
  };

  //拼图回调
  const pintuResult = (value: string) => {
    if (!value) return;
    sendSmsCode();
    setState({
      ...state,
      modalVisible: false,
    });
  };

  //发送短信验证码
  const sendSmsCode = () => {
    let { type, mobile } = props;
    props.dispatch({
      type: 'account/getSmscode',
      payload: {
        type,
        mobile,
      },
      callback: (res) => {
        if (res.code === 0) {
          interval(); //执行倒计时
          props.callback('', 'clearError');
          Toast.info(
            `已将短信验证码发送到您${filterTel(
              mobile,
            )}的手机当中，请注意查收！`,
            2,
          );
        } else {
          Toast.info(res.message, 2);
        }
      },
    });
  };

  //短信倒计时
  const interval = () => {
    let num = 60;
    setState({
      ...state,
      btnText: '重新发送(' + num + 's)',
      btnStyle: styles.disabled,
      modalVisible: false,
    });
    timer = setInterval(() => {
      if (num === 1) {
        ajaxFlag = true;
        setState({
          ...state,
          btnText: '重新获取',
          btnStyle: state.mobile ? styles.actived : styles.null,
          modalVisible: false,
          num: 60,
        });
        clearInterval(timer);
      } else {
        num--;
        setState({
          ...state,
          btnText: '重新发送(' + num + 's)',
          btnStyle: styles.disabled,
          modalVisible: false,
          num: num,
        });
      }
    }, 1000);
  };

  const modalCancel = () => {
    setState({
      ...state,
      modalVisible: false,
    });
  };

  const buttonStyle = props.buttonStyle || {
    height: '40px',
    lineHeight: '40px',
  };

  const modalWidth = document.body.clientWidth < 750 ? '95%' : '360px';
  console.log(state.btnStyle);
  return (
    <div className={styles.smscode}>
      <Row gutter={10}>
        <Col xs={14} sm={14} md={16} lg={16}>
          <Input
            size="large"
            maxLength={state.maxLength}
            autoComplete="off"
            placeholder="短信验证码"
            onChange={changeValue}
            onBlur={handleBlur}
            value={state.value}
            allowClear={true}
          />
        </Col>
        <Col xs={10} sm={10} md={8} lg={8}>
          <span
            className={styles.btn + ' ' + state.btnStyle}
            style={buttonStyle}
            onClick={submit}
          >
            {state.btnText}
          </span>
        </Col>
      </Row>

      <Modal
        style={{ width: modalWidth }}
        title="请先完成下方验证"
        footer={undefined}
        closable={true}
        maskClosable={false}
        transparent={true}
        visible={state.modalVisible}
        zIndex={1001}
        onClose={modalCancel}
        className={styles.pintuModal}
      >
        <PintuValidate no={state.pintuNo} callback={pintuResult} />
      </Modal>
    </div>
  );
};

export default connector(InputSmscode);
