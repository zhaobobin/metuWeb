/**
 * 图片列表元素 - 占位优化显示
 */
import { Link } from 'umi';
import LoadLazy from '@/components/common/load-lazy';
import styles from './photo-list.less';

interface IProps {
  index?: number;
  photo?: any;
  margin?: number;
  showEdit?: boolean;
}

const PhotoListItem = (props: IProps) => {
  const { index, photo, margin, showEdit } = props;
  return (
    <Link
      key={index}
      className={styles.photoGalleryItem}
      style={{ margin, width: photo.width, height: photo.height }}
      to={`/${photo.type}/${photo._id}/${photo.title}-by-${photo.author.nickname}`}
    >
      <LoadLazy width={photo.width} height={photo.height}>
        <img src={photo.src} alt={photo.title} />
      </LoadLazy>
      <p className={styles.cover}>
        <span className={styles.title}>{photo.title}</span>
        {showEdit && (
          <Link className={styles.edit} to={`/edit/photo/${photo._id}`}>
            编辑
          </Link>
        )}
      </p>
    </Link>
  );
};

export default PhotoListItem;
