import { useState, useEffect } from 'react';
import { Link, useSelector, useDispatch } from 'umi';
import { Spin } from 'antd';
import { IRootState } from '@/models/index';
import styles from './home-banner.less';

interface IState {
  imgStyle: string;
}

const HomeBanner = () => {
  const dispatch = useDispatch();
  const homeBanner = useSelector((state: IRootState) => state.photo.homeBanner);

  const initialState: IState = {
    imgStyle: '?x-oss-process=style/thumb_m',
  };

  const [state, setState] = useState(initialState);

  useEffect(() => {
    queryPhotoWel();
  }, []);

  const queryPhotoWel = () => {
    dispatch({
      type: 'photo/queryHomeBanner',
    });
  };

  //加载优化、img下载完成后再渲染组件
  const onLoad = () => {
    setTimeout(() => {
      setState({
        imgStyle: '?x-oss-process=style/cover',
      });
    }, 500);
  };

  const { imgStyle } = state;
  const data = homeBanner;

  const bgImg = data
    ? {
        backgroundImage: `url(${data.thumb.url}${imgStyle})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
      }
    : {};

  return (
    <div className={styles.container} style={bgImg}>
      {data ? (
        <div className={styles.item}>
          <img
            className={styles.hidden}
            src={data.thumb.url + '?x-oss-process=style/cover'}
            onLoad={onLoad}
            alt="banner"
          />
          {data.author && (
            <p className={styles.info}>
              <Link
                to={`/photos/${data._id}/${data.title}-by-${data.author.nickname}`}
              >
                {data.title}
              </Link>
              <span>by</span>
              <Link to={`/users/${data.author.username}`}>
                {data.author.nickname}
              </Link>
            </p>
          )}
        </div>
      ) : (
        <Spin className={styles.loading} size="large" delay={300} />
      )}
    </div>
  );
};

export default HomeBanner;
