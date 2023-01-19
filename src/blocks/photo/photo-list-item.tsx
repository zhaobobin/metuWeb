/**
 * 图片列表元素 - 占位优化显示
 */
import { history } from 'umi';
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

  const goPhotoDetail = () => {
    history.push(
      `/${photo.type}/${photo._id}/${photo.title}-by-${photo.author.nickname}`,
    );
  };

  const goPhotoEdit = () => {
    history.push(`/edit/photo/${photo._id}`);
  };

  return (
    <div
      key={index}
      className={styles.photoGalleryItem}
      style={{ margin, width: photo.width, height: photo.height }}
    >
      <LoadLazy width={photo.width} height={photo.height}>
        <img src={photo.src} alt={photo.title} />
      </LoadLazy>
      <p className={styles.cover} onClick={goPhotoDetail}>
        <span className={styles.title}>{photo.title}</span>
      </p>
      {showEdit && (
        <span className={styles.edit} onClick={goPhotoEdit}>
          编辑
        </span>
      )}
    </div>
  );
};

export default PhotoListItem;
