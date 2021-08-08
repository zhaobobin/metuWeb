import { useIntl } from 'umi';
import styles from './home-question.less';

const HomeQuestion = () => {
  const intl = useIntl();

  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <h1>{intl.formatMessage({ id: 'home.question.title' })}</h1>
      </div>

      <div className={styles.body}></div>
    </div>
  );
};

export default HomeQuestion;
