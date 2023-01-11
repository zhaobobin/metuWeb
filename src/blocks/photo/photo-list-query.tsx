/*
 * 相册列表 - 无限加载查询
 * <PhotoListQuery />
 */
import { useState, useEffect } from 'react';
import { useDispatch } from 'umi';
import { notification } from 'antd';
import InfiniteScroll from 'react-infinite-scroller'; //加载更多
import LoadingBg from '@/components/common/loading-bg';
import PhotoListGallery from '@/blocks/photo/photo-list-gallery';

interface IProps {
  category: string;
  page?: number;
  per_page?: number;
  maxQueryPage?: number;
  showEdit?: boolean;
  callback?: (count: number) => void;
}

interface IState {
  category: string;
  page: number;
  per_page: number; // 每页数量
  maxQueryPage?: number; // 最大查询页数，默认undefined
  initializing: number;

  loading: boolean;
  list: any[];
  total: number;
  hasMore: boolean;
}

const PhotoListQuery = (props: IProps) => {
  const dispatch = useDispatch();

  let ajaxFlag: boolean = true;
  const initialState: IState = {
    category: '', // 分类
    page: props.page || 1, // 当前页数
    per_page: props.per_page || 10, // 每页数量
    maxQueryPage: props.maxQueryPage || undefined, // 最大查询页数，默认undefined
    initializing: 1,

    loading: true,
    list: [],
    total: 0,
    hasMore: true,
  };
  const [state, setState] = useState(initialState);

  useEffect(() => {
    if (props.category !== state.category) {
      queryPhotoList(
        {
          category: props.category || '',
          page: 1,
          per_page: state.per_page,
        },
        true,
      );
    }
  }, [props.category]);

  const queryPhotoList = (query: any, clearList?: boolean) => {
    let list = clearList ? [] : state.list;

    dispatch({
      type: 'photo/queryPhotoList',
      payload: query,
      callback: (res) => {
        setTimeout(() => {
          ajaxFlag = true;
        }, 500);
        if (res.code === 0) {
          setState({
            ...state,
            loading: false,
            category: query.category,
            page: state.page + 1,
            list: list.concat(res.data.list),
            total: res.data.count,
            hasMore: res.data.hasMore,
          });
          props.callback && props.callback(res.data.count);
        } else {
          notification.error({ message: '提示', description: res.message });
        }
      },
    });
  };

  //Masonry布局 - 滚动加载更多
  const LoadMore = (page) => {
    if (!page) return;
    let { category, per_page, hasMore } = state;

    if (!hasMore) return;
    if (state.maxQueryPage && page >= state.maxQueryPage) return;

    if (!ajaxFlag) return;
    ajaxFlag = false;

    setTimeout(function () {
      queryPhotoList({
        category,
        page: page + 1,
        per_page,
      });
    }, 200);
  };

  const { showEdit } = props;
  const { loading, list, hasMore } = state;
  if (loading) {
    return <LoadingBg style={{ width: '100%', height: '500px' }} />;
  }
  return (
    <div className="photo-container">
      <InfiniteScroll
        pageStart={0}
        initialLoad={false}
        loadMore={LoadMore}
        hasMore={hasMore}
      >
        <PhotoListGallery photos={list} type="photos" showEdit={showEdit} />
      </InfiniteScroll>
    </div>
  );
};

export default PhotoListQuery;
