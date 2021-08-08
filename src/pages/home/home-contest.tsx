import { useIntl } from 'umi';
import styles from './home-contest.less';

const HomeContest = () => {
  const intl = useIntl();

  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <h1>{intl.formatMessage({ id: 'home.contest.title' })}</h1>
        <p>{intl.formatMessage({ id: 'home.contest.desc' })}</p>
      </div>

      <div className={styles.body}></div>
    </div>
  );
};

export default HomeContest;
