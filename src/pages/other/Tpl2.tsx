import { useEffect } from 'react';
import { useDispatch } from 'umi';
import styles from './index.less';

const Home = (props) => {
  const dispatch = useDispatch();
  const getToken = () => {
    dispatch({
      type: 'global/token',
    });
  };

  useEffect(() => {
    getToken();
  });
  return <div className={styles.container}>{props.children}</div>;
};

export default Home;
