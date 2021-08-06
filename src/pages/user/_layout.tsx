import styles from './index.less';

function UserLayout(props) {
  return (
    <div className={styles.container}>
      <div>{props.children}</div>
    </div>
  );
}

export default UserLayout;
