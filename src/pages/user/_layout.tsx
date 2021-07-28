import styles from './index.less';

function UserLayout(props) {
  return (
    <div className={styles.container}>
      <div>
        <h1>UserLayout</h1>
      </div>
      <div>{props.children}</div>
    </div>
  );
}

export default UserLayout;
