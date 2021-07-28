import styles from './index.less';

function SettingsLayout(props) {
  return (
    <div className={styles.container}>
      <div>
        <h1>SettingsLayout</h1>
      </div>
      <div>{props.children}</div>
    </div>
  );
}

export default SettingsLayout;
