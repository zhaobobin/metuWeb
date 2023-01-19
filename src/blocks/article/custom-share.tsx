/**
 * 自定义分享
 * url [String] 分享链接
 * title [String] 分享标题
 * desc [String] 分享描述
 * style [Object] 自定义样式
 * https://github.com/loo41/share-react
 */
import React from 'react';
import { WechatOutlined, QqOutlined, WeiboOutlined } from '@ant-design/icons';
import { Qq, Weibo } from 'share-react';
import QRCode from 'qrcode.react';
import ENV from '@/config/env';
import styles from './custom-share.less';

interface IProps {
  url?: string;
  title?: string;
  desc?: string;
  style?: React.CSSProperties;
}

export default function CusShare({ url, title, desc, style }: IProps) {
  //分享链接取，设置的url，或者浏览器当前url
  let shareParams = {
    url: url || window.location.href,
    title: title || ENV.info.hometitle,
    desc: desc || ENV.info.description,
  };

  return (
    <ul className={styles.CusShare}>
      <li className={styles.weichat} style={style}>
        <span>
          <WechatOutlined />
        </span>
        <span className={styles.ma}>
          <QRCode value={shareParams.url} size={100} />
        </span>
      </li>

      <li className={styles.qq} style={style}>
        <Qq data={shareParams} windowWidth={800} windowHeight={700}>
          <span className={styles.qq}>
            <QqOutlined />
          </span>
        </Qq>
      </li>

      <li className={styles.weibo} style={style}>
        <Weibo data={shareParams} windowWidth={800} windowHeight={700}>
          <span className={styles.zone}>
            <WeiboOutlined />
          </span>
        </Weibo>
      </li>
    </ul>
  );
}
