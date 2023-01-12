import { Input } from 'antd';
import styles from './article-search.less';

const Search = Input.Search;

export default function ArticleSearch() {
  return (
    <div className={styles.container}>
      <Search
        placeholder="搜索你需要的教程"
        onSearch={(value) => console.log(value)}
        size="large"
        style={{ width: '100%' }}
      />
    </div>
  );
}
