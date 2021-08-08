/**
 * 用户登录 - 模块
 */
import { useState } from 'react';
import { history } from 'umi';
import { connect, ConnectedProps } from 'react-redux';
import { Form, Button, Checkbox } from 'antd';
import {
  ScanOutlined,
  WechatOutlined,
  WeiboOutlined,
  QqOutlined,
} from '@ant-design/icons';
import ENV from '@/config/env';
import { Storage, Encrypt } from 'metu-ui/dist/utils/index';
import { RootState } from '@/models/index';
import styles from './user-sign.less';

import InputMobile from '@/components/form/input-mobile';
import InputPassword from '@/components/form/input-password';
import InputSmscode from '@/components/form/input-smscode';
import UserWechatLogin from './user-wechat-login';

const FormItem = Form.Item;
const keys1 = ['mobile', 'password'];
const keys2 = ['mobile', 'smscode'];

const mapStateToProps = (state: RootState) => ({
  global: state.global,
  account: state.account,
});
const connector = connect(mapStateToProps);

interface IProps extends ConnectedProps<typeof connector> {
  showType?: string;
  callback: () => void;
}

interface IState {
  mobile: string;
  loginType: 'psd' | 'sms' | 'scan';
  remember: boolean;
  errorCount: number;
  smscodeSended: boolean;
}

const UserLogin = (props: IProps) => {
  let ajaxFlag: boolean = true;
  const initialState: IState = {
    mobile: '',
    loginType: 'psd',
    remember: false,
    errorCount: 0,
    smscodeSended: false,
  };
  const [state, setState] = useState(initialState);
  const [form] = Form.useForm();
  const [, forceUpdate] = useState({});

  //重置表单
  const resetForm = () => {
    form.resetFields();
  };

  // 切换登录方式
  const changeLoginType = (loginType) => {
    resetForm();
    setState({
      ...state,
      loginType,
    });
  };

  // 微信登录
  const wechatLogin = () => {
    // resetForm();
    changeLoginType('scan');
  };

  // 微博登录
  const weiboLogin = () => {
    const WeiboLoginState = Encrypt('Weibologin', 'metuwang' + Math.random());
    Storage.set(ENV.storage.weiboLoginState, WeiboLoginState);

    let url = 'https://api.weibo.com/oauth2/authorize?';
    let params = {
      response_type: 'code',
      client_id: '1779469029',
      redirect_uri: encodeURI('http://www.metuwang.com/callback/weiboLogin'),
      state: WeiboLoginState,
    };
    for (let i in params) {
      url += i + '=' + params[i] + '&';
    }
    url = url.substring(0, url.lastIndexOf('&'));
    window.location.href = url;
    // openwindow(url, 'TencentLogin', 650, 600);
  };

  // QQ登录
  const qqLogin = () => {
    const QqLoginState = Encrypt('Qqlogin', 'metuwang' + Math.random());
    Storage.set(ENV.storage.qqLoginState, QqLoginState);

    let url = 'https://graph.qq.com/oauth2.0/authorize?';
    let params = {
      response_type: 'code',
      client_id: '101551625',
      redirect_uri: encodeURI('http://www.metuwang.com/callback/qqLogin'),
      state: QqLoginState,
    };
    for (let i in params) {
      url += i + '=' + params[i] + '&';
    }
    url = url.substring(0, url.lastIndexOf('&'));
    window.location.href = url;
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

  //记住账号
  const rememberChange = () => {
    let rememberState = !state.remember;
    Storage.set(ENV.storage.remenber, rememberState.toString());
    setState({ ...state, remember: rememberState });
  };

  //确定
  const onFinish = (values) => {
    if (!ajaxFlag) return;
    ajaxFlag = false;

    let { loginType } = state;
    let keys = loginType === 'psd' ? keys1 : keys2;
    form
      .validateFields(keys)
      .then((values) => {
        if (values.remember) {
          Storage.set(ENV.storage.lastTel, values.mobile);
        } else {
          Storage.set(ENV.storage.lastTel, '');
        }
        if (values.password)
          values.password = Encrypt(values.mobile, values.password);
        if (values.smscode)
          values.smscode = Encrypt(values.mobile, values.smscode);
        values.loginType = loginType;
        login(values);
        setTimeout(() => {
          ajaxFlag = true;
        }, 500);
      })
      .catch((error) => {});
  };

  const onFinishFailed = (values) => {};

  //登录
  const login = (values) => {
    props.dispatch({
      type: 'account/login',
      payload: values,
      callback: (res) => {
        if (res.code === 0) {
          props.callback();
        } else {
          form.setFields([
            {
              name: res.error_key,
              value: '',
              errors: [res.error_key],
            },
          ]);
        }
      },
    });
  };

  const setInputError = (status: number, msg: string) => {
    let key;
    switch (status) {
      case 10001:
        key = 'mobile';
        break;
      case 10002:
        key = 'password';
        break;
      case 10003:
        key = 'mobile';
        break;
      case 10004:
        key = 'smscode';
        break;
      default:
        break;
    }
    form.setFields([
      {
        name: key,
        value: '',
        errors: [msg],
      },
    ]);
  };

  const toRegister = () => {
    let { showType } = props;
    if (showType) {
      props.dispatch({
        type: 'global/changeSignModal',
        payload: {
          signModalVisible: true,
          signTabKey: '2',
        },
      });
    } else {
      history.push('/user/register');
    }
  };

  const toPsdReset = () => {
    let { showType } = props;
    if (showType) {
      props.dispatch({
        type: 'global/changeSignModal',
        payload: {
          signModalVisible: false,
          signTabKey: '1',
        },
      });
    }
    history.push('/user/reset');
  };

  const { lastTel } = props.global;
  const { loginType } = state;

  return (
    <div className={styles.sign}>
      <div className={styles.form}>
        <h4>
          <p>
            <span>推荐使用</span>
            <span
              onClick={() => changeLoginType('scan')}
              className={styles.scan}
            >
              <ScanOutlined /> 微信扫码
            </span>
            <span>登录 , 安全快捷</span>
          </p>
          <hr />
        </h4>

        <p className={styles.loginType}>
          <a>
            {loginType === 'psd' ? (
              <span onClick={() => changeLoginType('sms')}>短信快速登录</span>
            ) : (
              <span onClick={() => changeLoginType('psd')}>账号密码登录</span>
            )}
          </a>
        </p>

        <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <FormItem
            name="mobile"
            initialValue={lastTel}
            rules={[{ required: true, message: '请输入手机号' }]}
          >
            <InputMobile
              autoFocus={true}
              initialValue={lastTel}
              callback={mobileCallback}
            />
          </FormItem>

          {loginType === 'psd' ? (
            <FormItem
              name="password"
              validateFirst={true}
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <InputPassword callback={passwordCallback} />
            </FormItem>
          ) : (
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
          )}

          {loginType === 'psd' ? (
            <FormItem style={{ height: '40px' }}>
              <FormItem name="remember" valuePropName="checked" noStyle>
                <Checkbox onChange={rememberChange}>记住账号</Checkbox>
              </FormItem>
              <a className={styles.forgotPsd} onClick={toPsdReset}>
                忘记密码
              </a>
            </FormItem>
          ) : (
            <FormItem style={{ height: '40px' }}>
              <p>注意：未注册过的手机号，系统将会自动创建新账号</p>
            </FormItem>
          )}

          <Button
            size="large"
            type="primary"
            htmlType="submit"
            className={styles.btn}
            style={{ marginBottom: '20px' }}
            disabled={
              !!form.getFieldsError().filter((item) => item.errors.length)
                .length ||
              !form.getFieldValue('mobile') ||
              !form.getFieldValue(loginType === 'psd' ? 'password' : 'smscode')
            }
          >
            登录
          </Button>
        </Form>

        <div className={styles.loginShare}>
          <h4>
            <p>第三方登录</p>
            <hr />
          </h4>
          <p>
            <a className={styles.wechat} onClick={wechatLogin}>
              <WechatOutlined />
            </a>
            <a className={styles.weibo} onClick={weiboLogin}>
              <WeiboOutlined />
            </a>
            <a className={styles.qq} onClick={qqLogin}>
              <QqOutlined />
            </a>
          </p>
        </div>

        {loginType === 'scan' ? (
          <div className={styles.loginScan}>
            <UserWechatLogin />
          </div>
        ) : null}
      </div>

      <div className={styles.foot}>
        <p className={styles.loginChange}>
          <a className={styles.l} onClick={toRegister}>
            <span>注册新账号</span>
          </a>
          <a className={styles.r}>
            {loginType === 'psd' ? (
              <span onClick={() => changeLoginType('scan')}>
                切换到二维码登录
              </span>
            ) : (
              <span onClick={() => changeLoginType('psd')}>切换到账号登录</span>
            )}
          </a>
        </p>
      </div>
    </div>
  );
};

export default connector(UserLogin);
