/**
 * 重置密码 - 登录密码 或 交易密码
 * psdType [String] 密码类型
 * step [String]   Steps组件初始化
 */
import React, { useState, useEffect } from 'react';
import { history } from 'umi';
import { connect, ConnectedProps } from 'react-redux';
import { Row, Col, Form, Button, Steps, notification } from 'antd';
import { Encrypt } from 'metu-ui/dist/utils/index';
import { RootState } from '@/models/index';
import styles from './psd-reset.less';

import InputMobile from '@/components/form/input-mobile';
import InputPassword from '@/components/form/input-password';
import InputSmscode from '@/components/form/input-smscode';

const FormItem = Form.Item;
const Step = Steps.Step;

interface IStep {
  title: string;
  key: string;
  content: string | React.ReactElement;
}
const steps: IStep[] = [
  {
    title: '填写用户信息',
    key: 'index',
    content: 'First-content',
  },
  {
    title: '验证用户信息',
    key: 'smscode',
    content: 'Second-content',
  },
  {
    title: '重置密码',
    key: 'password',
    content: 'Thrid-content',
  },
  {
    title: '完成',
    key: 'finish',
    content: 'Last-content',
  },
];

const mapStateToProps = (state: RootState) => ({
  global: state.global,
  account: state.account,
});
const connector = connect(mapStateToProps);

// type stepType = 'index' | 'smscode' | 'password' | 'finish';
interface IProps extends ConnectedProps<typeof connector> {
  step: string;
  callback: () => void;
}

interface IState {
  current: number;
  mobile: string;
  smscode: string;
  smscodeSended: boolean;
  autoSubmitTimer: number;
}

const PsdReset = (props: IProps) => {
  let ajaxFlag: boolean = true;
  let loading: boolean = false;

  const initialState: IState = {
    current: 0,
    mobile: '',
    smscode: '',
    smscodeSended: false,
    autoSubmitTimer: 5,
  };

  const [state, setState] = useState(initialState);
  const [form] = Form.useForm();
  const [, forceUpdate] = useState({});

  useEffect(() => {
    initStep(props.step);
  }, [props.step]);

  // 清空输入框
  const emitEmpty = (key: string) => {
    form.resetFields([key]);
    if (key === 'mobile') {
      setState({ ...state, mobile: '' });
    }
  };

  //初始化步骤条
  const initStep = (step: string) => {
    for (let i in steps) {
      if (steps[i].key === step) {
        setState({ ...state, current: parseInt(i, 10) });
      }
    }
  };

  // 手机号
  const mobileCallback = (value: string, err?: string) => {
    if (err) {
      form.setFields([
        {
          name: 'mobile',
          value: value,
          errors: [err],
        },
      ]);
    } else {
      form.setFieldsValue({ mobile: value });
    }
    forceUpdate({});
  };

  // 短信验证码回调
  const smscodeCallback = (value: string, err?: string) => {
    //清空错误提示
    if (err === 'telError') {
      form.setFields([
        {
          name: 'mobile',
          value: value,
          errors: ['请输入手机号'],
        },
      ]);
      setState({ ...state, smscodeSended: true });
    } else if (err === 'clearError') {
      form.setFields([
        {
          name: 'smscode',
          value: value,
          errors: [''],
        },
      ]);
      setState({ ...state, smscodeSended: true });
    } else if (err === 'smscodeError') {
      form.setFields([
        {
          name: 'smscode',
          value: value,
          errors: [!value ? '请输入短信验证码' : '短信验证码格式有误'],
        },
      ]);
    } else {
      form.setFieldsValue({ smscode: value });
    }
    forceUpdate({});
  };

  // 密码
  const passwordCallback = (value: string, err?: string) => {
    if (err) {
      form.setFields([
        {
          name: 'password',
          value: value,
          errors: [err],
        },
      ]);
    } else {
      form.setFieldsValue({ password: value });
    }
    forceUpdate({});
  };

  // 确认密码
  const rpasswordCallback = (value: string, err?: string) => {
    if (err) {
      form.setFields([
        {
          name: 'rpassword',
          value: value,
          errors: [err],
        },
      ]);
    } else {
      form.setFieldsValue({ rpassword: value });
    }
    forceUpdate({});
  };

  // step 1 - 检验手机号
  const next1 = () => {
    form.validateFields(['mobile']).then((values) => {
      props.dispatch({
        type: 'account/checkMobile',
        payload: {
          mobile: values.mobile,
          action: 'reset',
        },
        callback: (res) => {
          if (res.code === 0) {
            setState({
              ...state,
              mobile: values.mobile,
            });
            history.push('/user/reset/smscode');
          } else {
            form.setFields([
              {
                name: res.error_key,
                value: '',
                errors: [res.message],
              },
            ]);
          }
        },
      });
    });
  };

  // step 2 - 检验短信验证码
  const next2 = () => {
    form.validateFields(['smscode']).then((values) => {
      setState({
        ...state,
        smscode: values.smscode,
      });
      history.push('/user/reset/password');
    });
  };

  // step 3 - 修改密码
  const changePsdSubmit = () => {
    loading = true;
    let { mobile, smscode } = state;
    form
      .validateFields(['password', 'rpassword'])
      .then((values) => {
        props.dispatch({
          type: 'account/resetPsd',
          payload: {
            mobile,
            smscode,
            password: Encrypt(mobile, values.password),
          },
          callback: (res) => {
            setTimeout(() => {
              loading = false;
            }, 500);
            if (res.code === 0) {
              history.push('/user/reset/finish');
            } else {
              notification['error']({
                message: 'Request Failed',
                description: res.message,
              });
            }
          },
        });
      })
      .catch((error) => {
        setTimeout(() => {
          loading = false;
          ajaxFlag = true;
        }, 500);
      });
  };

  // step 4 - 页面自动跳转
  const autoSubmit = () => {
    let { autoSubmitTimer } = state;
    let timer = setInterval(() => {
      if (autoSubmitTimer === 1) {
        clearInterval(timer);
        toLogin();
      } else {
        autoSubmitTimer--;
        setState({ ...state, autoSubmitTimer });
      }
    }, 1000);
  };

  // 去登录
  const toLogin = () => {
    history.push('/user/login');
  };

  const toResetIndex = () => {
    history.push('/user/reset/index');
  };

  const { current, mobile, autoSubmitTimer, smscodeSended } = state;

  steps[0].content = (
    <div className={styles.step1}>
      <div className={styles.formItemBox}>
        <FormItem
          name="mobile"
          initialValue={mobile}
          rules={[{ required: true, message: '请输入手机号码' }]}
        >
          <InputMobile initialValue={mobile} callback={mobileCallback} />
        </FormItem>
      </div>
    </div>
  );

  steps[1].content = (
    <div className={styles.step2}>
      <div className={styles.formItemBox}>
        <FormItem
          name="smscode"
          rules={[{ required: true, message: '请输入验证码' }]}
        >
          <InputSmscode
            type="login"
            mobile={
              form.getFieldError('mobile').length
                ? ''
                : form.getFieldValue('mobile')
            }
            callback={smscodeCallback}
          />
        </FormItem>
      </div>
    </div>
  );

  steps[2].content = (
    <div className={styles.step3}>
      <div className={styles.formItemBox}>
        <FormItem
          name="password"
          validateFirst={true}
          rules={[{ required: true, message: '请输入新密码' }]}
        >
          <InputPassword showPsdLevel={true} callback={passwordCallback} />
        </FormItem>
        <FormItem
          name="rpassword"
          dependencies={['password']}
          validateFirst={true}
          rules={[
            { required: true, message: '请再次输入新密码' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('两次输入的密码不一致!'));
              },
            }),
          ]}
        >
          <InputPassword showPsdLevel={true} callback={rpasswordCallback} />
        </FormItem>
      </div>
    </div>
  );

  steps[3].content = (
    <div className={styles.step4}>
      <div className={styles.desc}>
        <p className={styles.p1}>恭喜您成功找回密码！您需要重新登录系统。</p>
        <p className={styles.p2}>
          <span>{autoSubmitTimer}</span>s后将自动跳转到登录页面
        </p>
      </div>
    </div>
  );

  return (
    <div className={styles.psdReset}>
      <h1>找回密码</h1>

      {current > 0 && !mobile ? (
        toResetIndex()
      ) : (
        <Form form={form} className={styles.form}>
          <div className={styles.title}>
            <Steps current={current} labelPlacement="vertical">
              {steps.map((item) => (
                <Step key={item.key} title={item.title} />
              ))}
            </Steps>
          </div>

          <Row>
            <Col sm={1} xs={1} md={6} lg={6} />
            <Col sm={22} xs={22} md={12} lg={12}>
              <div className={styles.formContent}>
                <div className={styles.stepsContent}>
                  {steps[current].content}
                </div>

                <FormItem>
                  {current === 0 ? (
                    <Button
                      size="large"
                      type="primary"
                      className={styles.btn}
                      onClick={next1}
                      disabled={
                        !!form.getFieldError('mobile').length ||
                        !form.getFieldValue('mobile')
                      }
                    >
                      下一步
                    </Button>
                  ) : null}

                  {current === 1 ? (
                    <Button
                      size="large"
                      type="primary"
                      className={styles.btn}
                      onClick={next2}
                      disabled={
                        !!form.getFieldError('smscode').length ||
                        !form.getFieldValue('smscode') ||
                        !smscodeSended
                      }
                    >
                      下一步
                    </Button>
                  ) : null}

                  {current === 2 ? (
                    <Button
                      size="large"
                      type="primary"
                      className={styles.btn}
                      onClick={changePsdSubmit}
                      disabled={
                        !!form
                          .getFieldsError()
                          .filter((item) => item.errors.length).length ||
                        !form.getFieldValue('password') ||
                        !form.getFieldValue('rpassword')
                      }
                    >
                      下一步
                    </Button>
                  ) : null}

                  {current === 3 ? (
                    <Button
                      size="large"
                      type="primary"
                      className={styles.btn}
                      onClick={toLogin}
                    >
                      立即登录
                      {autoSubmit()}
                    </Button>
                  ) : null}
                </FormItem>
              </div>
            </Col>
            <Col sm={1} xs={1} md={6} lg={6} />
          </Row>
        </Form>
      )}
    </div>
  );
};

export default connector(PsdReset);
