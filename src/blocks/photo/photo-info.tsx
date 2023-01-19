/*
 * 图片信息 - PhotoSwiper.currentPhoto对应的图片信息
 * detail：文章数据
 * tags：标签
 * currentPhoto：当前图片
 */
import { useState } from 'react';
import { Link } from 'umi';
import styles from './photo-info.less';

import ArticleAuthorInfo from '@/blocks/article/article-author-info';

interface IProps {
  detail: any;
  currentPhoto: any;
  theme: string;
  changeExifDispkay: (visible: boolean) => void;
}

const PhotoInfo = (props: IProps) => {
  const [state, setState] = useState({ exifShow: '' });

  //显示exif详情
  const showExifDetail = () => {
    setState({ exifShow: styles.show });
    props.changeExifDispkay(true);
  };
  //隐藏exif详情
  const closeExifDetail = () => {
    setState({ exifShow: '' });
    props.changeExifDispkay(false);
  };

  const { detail, currentPhoto, theme } = props;
  // console.log(currentPhoto)
  const currentPhotoExif = JSON.parse(currentPhoto.exif);

  //tags
  const tagsList = detail.tags
    ? detail.tags.map((topic, index) => (
        <Link className={styles.tagItem} key={index} to={`/tags/${topic}`}>
          {topic}
        </Link>
      ))
    : null;

  //图片元数据详情
  let exifArr: any[] = [];
  for (let i in currentPhotoExif) {
    let o = { name: i, value: currentPhotoExif[i].value };
    exifArr.push(o);
  }
  const exifDetail =
    exifArr.length > 0
      ? exifArr.map((topic, index) => (
          <p key={index}>
            <label>{topic.name}</label>
            <span>{topic.value}</span>
          </p>
        ))
      : '';

  return (
    <div className={styles.photoInfo + ' ' + styles[theme]}>
      {detail ? (
        <div className={styles.frame}>
          <div className={styles.section + ' ' + styles.author}>
            <ArticleAuthorInfo detail={detail} />
          </div>

          <div className={styles.section + ' ' + styles.title}>
            <h1>{detail.title}</h1>
            <p>{currentPhoto.title}</p>
            <p className={styles.tagList}>{tagsList}</p>
          </div>

          {currentPhotoExif ? (
            <div className={styles.section + ' ' + styles.exif}>
              <ul>
                <li key="model" className={styles.camera}>
                  {currentPhoto.camera ? (
                    <Link
                      to={`/equipments/camera-${currentPhoto.camera.modelName}`}
                    >
                      {currentPhoto.camera.model}
                    </Link>
                  ) : (
                    '无相机记录'
                  )}
                </li>
                <li key="lens" className={styles.lens}>
                  {currentPhoto.lens ? (
                    <Link
                      to={`/equipments/lens-${currentPhoto.lens.modelName}`}
                    >
                      {currentPhoto.lens.model}
                    </Link>
                  ) : (
                    '无镜头记录'
                  )}
                </li>
                {currentPhoto.exposure ? (
                  <li key="fn">
                    {currentPhoto.exposure.FNumber ? (
                      <span>f{currentPhoto.exposure.FNumber},</span>
                    ) : null}
                    {currentPhoto.exposure.ExposureTime ? (
                      <span>{currentPhoto.exposure.ExposureTime}s,</span>
                    ) : null}
                    {currentPhoto.exposure.ISOSpeedRatings ? (
                      <span>ISO{currentPhoto.exposure.ISOSpeedRatings}</span>
                    ) : null}
                  </li>
                ) : (
                  ''
                )}
                <li>
                  <a onClick={showExifDetail}>查看完整exif信息</a>
                </li>
              </ul>
            </div>
          ) : null}
        </div>
      ) : null}

      <div className={styles.exifDetail + ' ' + state.exifShow}>
        <p>
          <label>
            <strong>EXIF信息</strong>
          </label>
          <span>
            <a className={styles.close} onClick={closeExifDetail}>
              关闭
            </a>
          </span>
        </p>
        {exifDetail}
      </div>
    </div>
  );
};

export default PhotoInfo;
