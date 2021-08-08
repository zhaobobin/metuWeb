import { useIntl } from 'umi';
import styles from './home-circle.less';

const HomeCircle = () => {
  const intl = useIntl();

  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <h1>{intl.formatMessage({ id: 'home.circle.title' })}</h1>
      </div>

      <div className={styles.body}></div>
    </div>
  );
};

export default HomeCircle;
