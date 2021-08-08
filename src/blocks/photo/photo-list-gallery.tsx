/*
 * 图片列表 - 滚动分批加载
 * photos: 数组
 * <PhotoListGallery photos={photos}/>
 */
import React from 'react';
import { Row, Col } from 'antd';
import { debounce } from 'lodash';
import Gallery from 'react-photo-gallery';
import Measure from 'react-measure';
import PhotoListItem from './photo-list-item';

import styles from './photo-list.less';

interface IProps {
  showEdit?: boolean;
  category?: string;
  photos: any[];
  type: string;
}

interface IState {
  width: number;
  category: string;
  photos: any[];
  type: string;
}

export default class PhotoListGallery extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      width: document.body.clientWidth, //获取文档宽度
      category: this.props.category || '', //分类，发生改变时清空photos数组
      photos: this.props.photos, //图片列表
      type: this.props.type, //图片类型：photos(照片集)、photo(照片详情)
    };
    this.loadMorePhotos = debounce(this.loadMorePhotos, 200);
  }

  componentDidMount() {
    this.loadMorePhotos(this.props);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.loadMorePhotos(nextProps);
  }

  loadMorePhotos = (props) => {
    if (props.photos === this.state.category) {
      this.setState({
        photos: this.state.photos.concat(props.photos),
      });
    } else {
      this.setState({
        category: props.category,
        photos: props.photos,
        type: props.type,
      });
    }
  };

  onResize = (contentRect) => {
    let width = contentRect.bounds.width;
    if (width !== this.state.width) this.setState({ width });
  };

  measureRef(measureRef) {
    const { showEdit } = this.props;
    let { width, photos, type } = this.state;
    if (width < 1) return <div ref={measureRef} />;
    let columns = 2;
    if (width >= 480) columns = 3;
    if (width >= 1024) columns = 4;
    if (width >= 1600) columns = 5;

    let photoList: any[] = [];
    if (photos.length > 0) {
      for (let j in photos) {
        const i = parseInt(j);
        let src = photos[i].thumb.url + '?x-oss-process=style/thumb';
        let photo = {
          key: i,
          _id: photos[i]._id,
          author: photos[i].author,
          title: photos[i].title,
          src: src,
          width: photos[i].thumb.width
            ? parseInt(photos[i].thumb.width, 10)
            : 1920,
          height: photos[i].thumb.height
            ? parseInt(photos[i].thumb.height, 10)
            : 1080,
          type: type,
        };

        photoList.push(photo);
      }
    }

    return (
      <div ref={measureRef}>
        <Gallery
          photos={photoList}
          columns={columns}
          margin={5}
          ImageComponent={({ ...props }) => (
            <PhotoListItem {...props} showEdit={showEdit} />
          )}
        />
      </div>
    );
  }

  render() {
    return (
      <Row>
        <Col xs={0} sm={0} md={1} lg={1} />
        <Col xs={24} sm={24} md={22} lg={22}>
          <div className={styles.photoGallery}>
            <Measure bounds onResize={this.onResize}>
              {({ measureRef }) => this.measureRef(measureRef)}
            </Measure>
          </div>
        </Col>
        <Col xs={0} sm={0} md={1} lg={1} />
      </Row>
    );
  }
}
