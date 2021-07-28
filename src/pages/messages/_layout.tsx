import styles from './index.less';

function MessagesLayout(props) {
  return (
    <div className={styles.container}>
      <div>
        <h1>MessagesLayout</h1>
      </div>
      <div>{props.children}</div>
    </div>
  );
}

export default MessagesLayout;
