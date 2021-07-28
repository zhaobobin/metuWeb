import styles from './index.less';

function SearchLayout(props) {
  return (
    <div className={styles.container}>
      <div>
        <h1>SearchLayout</h1>
      </div>
      <div>{props.children}</div>
    </div>
  );
}

export default SearchLayout;
