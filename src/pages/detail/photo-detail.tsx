/*
 * 图片详情
 */
import { useState, useEffect } from 'react';
import { useDispatch, useSelector, useParams } from 'umi';
import { notification } from 'antd';
import { goBack } from '@/utils/utils';
import { ENV } from 'metu-ui/dist/utils/index';
import { IPhotoDetail, IImage } from 'metu-ui/dist/types/CommonTypes';
import { IRootState } from '@/models/index';
import classNames from 'classnames';
import styles from './photo-detail.less';

import LoadingBg from '@/components/common/loading-bg';
import PhotoSwiper from '@/blocks/photo/photo-swiper';
import PhotoAction from '@/blocks/photo/photo-action';
import PhotoInfo from '@/blocks/photo/photo-info';
import CommentList from '@/blocks/comments/comment-list';

interface IState {
  detail: IPhotoDetail | null;
  currentPhoto: IImage | null;
  exifDisplay: Boolean;
}

const PhotoDetail = () => {
  const dispatch = useDispatch();
  const params = useParams<{ id: string }>();
  const global = useSelector((state: IRootState) => state.global);

  const initialState: IState = {
    detail: null,
    currentPhoto: null,
    exifDisplay: false,
  };
  const [state, setState] = useState(initialState);

  useEffect(() => {
    queryDetail(params.id);
  }, [params.id]);

  const queryDetail = (id: string) => {
    dispatch({
      type: 'photo/queryPhotoDetail',
      payload: {
        photo_id: id,
      },
      callback: (res) => {
        if (res.code === 0) {
          let data = res.data;
          document.title =
            data.title +
            ' - ' +
            data.author.nickname +
            ' - ' +
            ENV.info.appname;
          if (data.tags && typeof data.tags === 'string')
            data.tags = data.tags.split(',');

          setState({
            ...state,
            detail: data,
            currentPhoto: data.images[0],
          });
        } else {
          notification.error({ message: '提示', description: res.message });
          goBack();
        }
      },
    });
  };

  const changeCurrentPhoto = (photo: IImage) => {
    setState({ ...state, currentPhoto: photo });
  };

  const changeExifDispkay = (visible: boolean) => {
    setState({ ...state, exifDisplay: visible });
  };

  const { detail, currentPhoto } = state;
  const theme = global.readModel || 'black';

  if (!detail) {
    return (
      <LoadingBg
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          left: 0,
          top: 0,
        }}
      />
    );
  }

  return (
    <div className={styles.photoDetail + ' ' + styles[theme]}>
      <div className={styles.photoContent}>
        {currentPhoto && (
          <PhotoSwiper
            list={detail.images}
            currentKey={0}
            callback={changeCurrentPhoto}
            theme={theme}
          />
        )}
      </div>

      {currentPhoto ? (
        <div className={styles.photoSlide}>
          <div className={styles.head}>
            <PhotoAction detail={detail} theme={theme} />
          </div>

          <div
            className={classNames(styles.body, {
              [styles.exifShow]: state.exifDisplay,
            })}
          >
            <PhotoInfo
              detail={detail}
              currentPhoto={currentPhoto}
              theme={theme}
              changeExifDispkay={changeExifDispkay}
            />
            <div className={styles.foot}>
              <CommentList
                url={`/photos/${detail._id}/comments`}
                category="photos"
                detail_id={detail._id}
                theme={theme}
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default PhotoDetail;
