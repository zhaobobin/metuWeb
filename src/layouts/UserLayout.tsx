import styles from './index.less';

function UserLayout(props) {
  return <div className={styles.container}>{props.children}</div>;
}

export default UserLayout;
