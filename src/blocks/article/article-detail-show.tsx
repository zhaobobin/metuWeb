import { Link } from 'umi';
import styles from './article-detail-show.less';

// import ArticleAuthorInfo from './article-author-info'

export default function ArticleDetailShow({ detail }) {
  return (
    <div className={styles.detail}>
      <div className={styles.head}>
        <h1>{detail.title}</h1>

        {detail.author ? (
          <div className={styles.author}>
            {/* <ArticleAuthorInfo detail={detail}/> */}
          </div>
        ) : null}
      </div>

      <div
        className={styles.body}
        dangerouslySetInnerHTML={{ __html: detail.content }}
      />

      <div className={styles.foot}>
        {detail.tags
          ? detail.tags.map((topic, index) => (
              <Link className={styles.tagItem} key={index} to={`tags/${topic}`}>
                {topic}
              </Link>
            ))
          : null}
      </div>
    </div>
  );
}
