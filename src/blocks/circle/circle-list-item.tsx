/**
 * 圈子列表 - item
 */
import { Link } from 'umi';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styles from './circle-list-item.less';

export default function CircleListItem({ item }) {
  return (
    <div className={styles.circleItem}>
      <Link to={`/community/circle/detail/${item._id}`}>
        <div className={styles.head}>
          <div className={styles.avatar}>
            {item.avatar_url ? (
              <Avatar src={item.avatar_url} size={90} />
            ) : (
              <Avatar icon={<UserOutlined />} size={90} />
            )}
          </div>
          <p className={styles.name}>{item.name}</p>
          <p className={styles.desc}>{item.description}</p>
          <p className={styles.info}>
            <span>成员：{item.member_number}</span>
            <span>作品：{item.photo_number}</span>
            <span>活动：{item.activity_number}</span>
          </p>
        </div>
      </Link>
    </div>
  );
}
