/**
 * 微信扫码授权登录
 * 参考：https://www.npmjs.com/package/wxlogin.react
 */
import WxLogin from 'wxlogin.react';
import { Storage, Encrypt } from 'metu-ui/dist/utils/index';
import ENV from '@/config/env';
import WechatConfig from 'metu-ui/dist/config/wechat';

const UserWechatLogin = () => {
  const WechatLoginState = Encrypt('wechatlogin', `metuwang${Math.random()}`);
  Storage.set(ENV.storage.wechatLoginState, WechatLoginState);

  return (
    <div>
      {/*<h4>*/}
      {/*<p>*/}
      {/*<span>微信扫码 安全登录</span>*/}
      {/*</p>*/}
      {/*<hr/>*/}
      {/*</h4>*/}

      <WxLogin
        option={{
          appid: WechatConfig.AppId,
          userServiceAPI: WechatConfig.redirect_uri,
          scope: WechatConfig.scope,
          state: WechatLoginState,
          userServiceParams: {
            from: 'pc',
            flag: 'signin',
            type: 'weixin',
            env: 'development',
            uid: '',
          },
          smartRedirect: '',
          href: '', // 'data:text/css;base64,' + Base64.encode('./UserWechatLoginHref.css')
        }}
        style={{
          width: '100%',
          height: '400px',
          overflow: 'hidden',
          textAlign: 'center',
        }}
      />
    </div>
  );
};

export default UserWechatLogin;
