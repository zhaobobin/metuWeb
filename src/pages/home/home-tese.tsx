import { Link } from 'umi';
import { Row, Col } from 'antd';
import Icon from '@/components/icon';
import styles from './home-tese.less';

export default function HomeTese() {
  const List = [
    {
      title: '发现',
      desc: '他人镜头里的奇观',
      url: '/community/popular',
      icon: 'SearchOutlined',
    },
    {
      title: '圈子',
      desc: '以图会友，相互交流',
      url: '/cricle',
      icon: 'TeamOutlined',
    },
    {
      title: '活动',
      desc: '精彩活动，不容错过',
      url: '/contest',
      icon: 'TrophyOutlined',
    },
    {
      title: '供稿',
      desc: '好照片能赚钱',
      url: '/publish/photo',
      icon: 'AccountBookOutlined',
    },
  ];

  return (
    <div className={styles.container}>
      <Row>
        <Col xs={0} sm={0} md={4} lg={4} />
        <Col xs={24} sm={24} md={16} lg={16}>
          <Row>
            {List.map((item, index) => (
              <Col xs={12} sm={12} md={6} lg={6} key={index}>
                <Link className={styles.item} to={item.url}>
                  <Icon
                    type={item.icon}
                    style={{ fontSize: 60, color: '#525558' }}
                  />
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </Link>
              </Col>
            ))}
          </Row>
        </Col>
        <Col xs={0} sm={0} md={4} lg={4} />
      </Row>
    </div>
  );
}
