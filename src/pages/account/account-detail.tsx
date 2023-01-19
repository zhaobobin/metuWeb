/*
 * 用户资料
 * */
import { useSelector } from 'umi';
import { IRootState } from '@/models';
import dayjs from 'dayjs';
import styles from './account-detail.less';

export default function AccountDetail() {
  const detail = useSelector((state: IRootState) => state.user.userDetail);
  return (
    <div className={styles.accountDetail}>
      <dl>
        <dt>
          <strong>基本信息</strong>
        </dt>
        <dd>
          <p>
            <label>居住地：</label> <span>{detail.location}</span>
          </p>
          <p>
            <label>注册时间：</label>{' '}
            <span>{dayjs(detail.create_at).format('YYYY-MM-DD')}</span>
          </p>
          <p>
            <label>描述：</label> <span></span>
          </p>
        </dd>
      </dl>

      <dl>
        <dt>订阅的标签</dt>
        <dd></dd>
      </dl>

      <dl>
        <dt>常用的标签</dt>
        <dd></dd>
      </dl>

      <dl>
        <dt>常用的器材</dt>
        <dd></dd>
      </dl>
    </div>
  );
}
