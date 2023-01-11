/**
 * 用户注册 - 模块
 */
import { useState } from 'react';
import { history, useDispatch } from 'umi';
import { Form, Button } from 'antd';
import { Encrypt } from 'metu-ui/dist/utils/index';
import styles from './user-sign.less';

import InputMobile from '@/components/form/input-mobile';
import InputText from '@/components/form/input-text';
import InputPassword from '@/components/form/input-password';
import InputSmscode from '@/components/form/input-smscode';
import FormXieyi from '@/components/form/form-xieyi';

const FormItem = Form.Item;

interface IProps {
  showType?: string;
  nickname?: string;
  wechat_userinfo?: any;
  weibo_userinfo?: any;
  qq_userinfo?: any;
  callback: () => void;
}

interface IState {
  userType: 'user' | 'admin';
}

const UserRegister = (props: IProps) => {
  const dispatch = useDispatch();

  let ajaxFlag: boolean = true;
  const initialState: IState = {
    userType: 'user',
  };
  const [state, setState] = useState(initialState);
  const [form] = Form.useForm();
  const [, forceUpdate] = useState({});

  const resetForm = () => {
    form.resetFields();
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

  // 昵称
  const nicknameCallback = (value: string) => {
    form.setFieldsValue({ nickname: value });
    form.validateFields(['nickname']);
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
    } else if (err === 'clearError') {
      form.setFields([
        {
          name: 'smscode',
          value: value,
          errors: [''],
        },
      ]);
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
  const passwordCallback = (value: string) => {
    form.setFieldsValue({ password: value });
    form.validateFields(['password']);
  };

  // 协议
  const xieyiCallback = (checked: boolean) => {
    form.setFieldsValue({ xieyi: checked });
  };

  //确定
  const submit = () => {
    if (!ajaxFlag) return;
    ajaxFlag = false;
    form
      .validateFields()
      .then((values) => {
        values.password = Encrypt(values.mobile, values.password);
        register(values);
        setTimeout(() => {
          ajaxFlag = true;
        }, 500);
      })
      .catch((error) => {});
  };

  //注册
  const register = (values) => {
    let data = {
      registerType: 'psd', // 注册方式
      userType: state.userType,
      ...values,
    };

    // 第三方登录
    let { wechat_userinfo, weibo_userinfo, qq_userinfo } = props;

    // 微信
    if (wechat_userinfo) {
      data.registerType = 'wechat';
      data.wechat_openid = wechat_userinfo.openid;
      data.gender = wechat_userinfo.gender;
      data.userpic = wechat_userinfo.profile_image_url;
    }

    // 微博
    if (weibo_userinfo) {
      data.registerType = 'weibo';
      data.weibo_uid = weibo_userinfo.uid;
      data.gender = weibo_userinfo.sex;
      data.userpic = weibo_userinfo.headimgurl;
    }

    // QQ
    if (qq_userinfo) {
      data.registerType = 'qq';
      data.qq_openid = qq_userinfo.openid;
      data.gender = qq_userinfo.gender;
      data.userpic = qq_userinfo.figureurl_2;
    }
    // 第三方登录 end!!!

    dispatch({
      type: 'account/register',
      payload: data,
      callback: (res) => {
        if (res.code === 0) {
          props.callback();
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
  };

  const setInputError = (status: number, msg: string) => {
    let key;
    switch (status) {
      case 20001:
        key = 'mobile';
        break;
      case 20002:
        key = 'password';
        break;
      case 20003:
        key = 'nickname';
        break;
      case 20004:
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

  const toLogin = () => {
    let { showType } = props;
    if (showType) {
      dispatch({
        type: 'global/changeSignModal',
        payload: {
          signModalVisible: true,
          signTabKey: '1',
        },
      });
    } else {
      history.push('/user/login');
    }
  };

  return (
    <div className={styles.sign}>
      <div className={styles.form}>
        <h4>
          <p>快速注册</p>
          <hr />
        </h4>

        <Form form={form} onFinish={submit}>
          <FormItem
            name="mobile"
            rules={[{ required: true, message: '请输入手机号' }]}
          >
            <InputMobile autoFocus={true} callback={mobileCallback} />
          </FormItem>

          <FormItem
            name="nickname"
            initialValue={props.nickname}
            rules={[{ required: true, message: '请输入昵称' }]}
          >
            <InputText
              defaultVaule={props.nickname}
              placeholder="昵称"
              callback={nicknameCallback}
            />
          </FormItem>

          <FormItem
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <InputPassword showPsdLevel={true} callback={passwordCallback} />
          </FormItem>

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

          <FormItem
            style={{ height: '40px' }}
            name="xieyi"
            valuePropName="checked"
            initialValue={true}
          >
            <FormXieyi callback={xieyiCallback} />
          </FormItem>

          <Button
            size="large"
            type="primary"
            htmlType="submit"
            className={styles.btn}
            style={{ marginBottom: '10px' }}
            disabled={
              !!form.getFieldsError().filter((item) => item.errors.length)
                .length ||
              !form.getFieldValue('mobile') ||
              !form.getFieldValue('nickname') ||
              !form.getFieldValue('password') ||
              !form.getFieldValue('smscode') ||
              !form.getFieldValue('xieyi')
            }
          >
            注册
          </Button>

          <p>
            已有账号？返回{' '}
            <a onClick={toLogin} className={styles.blue}>
              登录
            </a>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default UserRegister;
