import { Link } from 'umi';
import dayjs from 'dayjs';
import logo from '@/assets/logo2.png';
import styles from './article-list-item.less';

interface IProps {
  item: any;
  showEdit?: boolean;
}

export default function ArticleListItem({ item, showEdit }: IProps) {
  return (
    <div key={item._id} className={styles.articleItem}>
      <div className={styles.body}>
        <Link
          to={`/graphic/${item._id}/${item.title}-by-${item.author.nickname}`}
          className={styles.thumb}
        >
          <img src={item.thumb ? item.thumb : logo} alt={item.title} />
        </Link>
        <div className={styles.info}>
          <h2>
            <Link
              to={`/graphic/${item._id}/${item.title}-by-${item.author.nickname}`}
            >
              {item.title}
            </Link>
          </h2>
          <p className={styles.desc}>{item.description}</p>
          {showEdit && (
            <Link className={styles.edit} to={`/edit/article/${item._id}`}>
              编辑
            </Link>
          )}
        </div>
      </div>

      <div className={styles.foot}>
        <p className={styles.tags}>
          {item.tags
            ? item.tags.map((tag, index) => (
                <Link key={index} to={`/tags/${tag}`}>
                  {tag}
                </Link>
              ))
            : ''}
        </p>
        <p className={styles.handler}>
          <span>{item.author.nickname}</span>
          <span>{dayjs(item.create_at).format('YYYY-MM-DD')}</span>
          <span>{item.view_number || 0} 阅读</span>
          <span>{item.comment_number || 0} 评论</span>
        </p>
      </div>
    </div>
  );
}
