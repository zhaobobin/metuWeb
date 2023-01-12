import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'umi';
import { IRootState } from '@/models/index';
import { Row, Col, Spin } from 'antd';
import { IImage } from 'metu-ui/dist/types/CommonTypes';
import { goBack } from '@/utils/utils';
import {
  ArrowsAltOutlined,
  ShrinkOutlined,
  BulbOutlined,
  BulbFilled,
  CloseOutlined,
  LeftOutlined,
  RightOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined,
} from '@ant-design/icons';

import styles from './photo-swiper.less';

const screenfull = require('screenfull');

interface IProps {
  list: IImage[];
  currentKey: number;
  theme: string;
  callback: (currentPhoto: IImage) => void;
}

interface IState {
  loading: boolean;
  list: IImage[];
  photoTotal: number; //图片总数
  thumbLen: number; //thumb长度，从0开始计算
  currentPhoto: IImage; //当前图片信息
  currentKey: number; //thumb当前key
  currentIndex: number; //thumb当前索引
  translate: number; //thumb位移
  screenfull: boolean;
  screenfullType: string;
  swiperClass: React.CSSProperties;
}

const PhotoSwiper = (props: IProps) => {
  const document: any = window.document;
  let scrollFlag: boolean = false;

  const refMap = useRef([]);
  const dispatch = useDispatch();
  const global = useSelector((state: IRootState) => state.global);

  const initialState: IState = {
    loading: true,
    list: props.list,
    photoTotal: props.list.length,
    thumbLen: props.list.length - 1,
    currentPhoto: props.list[props.currentKey],
    currentKey: props.currentKey,
    currentIndex: 1,
    translate: -58 - props.currentKey * 116,
    screenfull: false,
    screenfullType: 'arrows-alt',
    swiperClass: styles.photoSwiper,
  };

  const [state, setState] = useState(initialState);

  useEffect(() => {
    //监听键盘
    document.onkeydown = (event) => {
      let e = event || window.event;
      if (!e) return;
      //console.log(e.keyCode)
      if (e.keyCode === 37 || e.keyCode === 100) {
        //左
        prevPhoto();
      }
      if (e.keyCode === 39 || e.keyCode === 102) {
        //右
        nextPhoto();
      }
    };

    //监控全屏切换
    if (screenfull.enabled) {
      document.addEventListener(screenfull.raw.fullscreenchange, function () {
        setState({
          ...state,
          screenfull: screenfull.isFullscreen,
          screenfullType: screenfull.isFullscreen ? 'arrows-alt' : 'shrink',
          swiperClass: screenfull.isFullscreen
            ? styles.photoSwiper + ' ' + styles.fullscreen
            : styles.photoSwiper,
        });
      });
    }

    return () => {
      window.onmousewheel = document.onmousewheel = null;
    };
  }, []);

  //监控鼠标进入
  const mouseEnter = () => {
    //监听鼠标滚轮
    if (document.addEventListener)
      document.addEventListener('DOMMouseScroll', scrollFunc, false); //W3C
    window.onmousewheel = document.onmousewheel = scrollFunc; //IE/Opera/Chrome
  };
  //监控鼠标离开
  const mouseLeave = () => {
    document.removeEventListener('DOMMouseScroll', scrollFunc, false);
    window.onmousewheel = document.onmousewheel = null;
  };

  //判断鼠标滚动方向
  const scrollFunc = (e) => {
    if (!scrollFlag) return;
    scrollFlag = false;

    e = e || window.event;
    if (e.wheelDelta) {
      //IE/Opera/Chrome
      if (e.wheelDelta === 120) {
        //向上
        prevPhoto();
      }
      if (e.wheelDelta === -120) {
        //向下
        nextPhoto();
      }
    } else if (e.detail) {
      //Firefox
      if (e.detail === -3) {
        //向上
        prevPhoto();
      }
      if (e.detail === 3) {
        //向下
        nextPhoto();
      }
    }
    setTimeout(() => {
      scrollFlag = true;
    }, 300);
  };

  //加载优化、img下载完成后再渲染组件
  const loaded = () => {
    setState({ ...state, loading: false });
  };

  //thumb切换
  const photoHandle = (key) => {
    thumbAnimate(key);
  };
  //上一张
  const prevPhoto = () => {
    let key = state.currentKey;
    if (key === 0) return;
    key -= 1;
    thumbAnimate(key);
  };
  //下一张
  const nextPhoto = () => {
    let key = state.currentKey;
    if (key === state.thumbLen) return;
    key += 1;
    thumbAnimate(key);
  };
  //上四张
  const prevThumb = () => {
    let key = state.currentKey;
    if (key === 0) return;
    key -= 4;
    if (key < 0) key = 0;
    thumbAnimate(key);
  };
  //下四张
  const nextThumb = () => {
    let key = state.currentKey;
    if (key === state.thumbLen) return;
    key += 4;
    if (key > state.thumbLen) key = state.thumbLen;
    thumbAnimate(key);
  };
  //thumb位移动画
  const thumbAnimate = (key) => {
    let translate = -58 - key * 116,
      currentPhoto = state.list[key];
    props.callback(currentPhoto);
    setState({
      ...state,
      loading: true,
      currentKey: key,
      currentIndex: key + 1,
      translate: translate,
      currentPhoto: currentPhoto,
    });
  };

  //全屏切换
  const onChangeFullscreen = () => {
    if (screenfull.enabled) {
      const screenFull = refMap?.current['screenFull'];
      screenfull.toggle(screenFull);
    }
  };

  // 阅读模式
  const toggleReadModel = () => {
    let { readModel } = global;
    readModel = readModel === 'black' ? 'white' : 'black';
    dispatch({
      type: 'global/changeReadModel',
      payload: {
        readModel,
      },
    });
  };

  const { loading, list, currentPhoto, currentKey, swiperClass } = state;
  const { readModel } = global;
  //console.log(this.props.currentKey)

  //thumb初始位移
  const thumbStyle = {
    width: state.photoTotal * 116,
    transform: 'translateX(' + state.translate + 'px)',
  };

  //缩略图列表 - 加载完毕时渲染
  const thumbList =
    list.length > 0
      ? list.map((topic: any, index) => (
          <div
            key={topic._id}
            className={
              styles.thumbItem +
              ' ' +
              (index === currentKey ? styles.current : null)
            }
            onClick={() => photoHandle(index)}
            style={{
              backgroundImage:
                'url(' + topic.url + '?x-oss-process=style/thumb_s)',
            }}
          />
        ))
      : null;

  return (
    <div className={swiperClass + ' ' + styles[props.theme]} ref="screenFull">
      <Row className={styles.swiperHeader}>
        <Col span={2}>
          <a
            className={styles.full}
            title="全屏显示"
            onClick={onChangeFullscreen}
          >
            {state.screenfull ? <ShrinkOutlined /> : <ArrowsAltOutlined />}
          </a>
          <a className={styles.read} title="阅读模式" onClick={toggleReadModel}>
            {readModel === 'black' ? <BulbFilled /> : <BulbOutlined />}
          </a>
        </Col>
        <Col span={20}>
          <span>
            {state.currentIndex}/{state.photoTotal}
          </span>
        </Col>
        <Col span={2}>
          <a className={styles.close} title="关闭" onClick={goBack}>
            <CloseOutlined />
          </a>
        </Col>
      </Row>

      {currentPhoto && (
        <div className={styles.detailSwiper}>
          <div className={styles.scene}>
            <div className={styles.sceneContainer}>
              <div className={styles.spin}>
                <Spin spinning={loading} size="large" />
              </div>
              <img
                className={styles.currentPhoto}
                src={currentPhoto.url + '?x-oss-process=style/cover'}
                alt="current"
              />
              {/*<img className={styles.currentPhoto} onLoad={this.loaded} src={currentPhoto.url + '?x-oss-process=style/cover'} alt="photo"//>*/}
            </div>
            <a className={styles.mask} onClick={onChangeFullscreen}>
              <i />
            </a>
            <a
              className={styles.arrow + ' ' + styles.prev}
              title="上一张"
              onClick={prevPhoto}
            >
              <LeftOutlined />
            </a>
            <a
              className={styles.arrow + ' ' + styles.next}
              title="下一张"
              onClick={nextPhoto}
            >
              <RightOutlined />
            </a>
          </div>

          <div className={styles.thumb}>
            <div className={styles.thumbContainer} style={thumbStyle}>
              {thumbList}
            </div>
            <a
              className={styles.arrow + ' ' + styles.prev}
              title="上四张"
              onClick={prevThumb}
            >
              <DoubleLeftOutlined />
            </a>
            <a
              className={styles.arrow + ' ' + styles.next}
              title="下四张"
              onClick={nextThumb}
            >
              <DoubleRightOutlined />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoSwiper;
