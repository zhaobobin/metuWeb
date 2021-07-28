import styles from './index.less';

function AccountLayout(props) {
  return (
    <div className={styles.container}>
      <div>
        <h1>AccountLayout</h1>
      </div>
      <div>{props.children}</div>
    </div>
  );
}

export default AccountLayout;
