import { useEffect, useState } from 'react';
import { useDispatch } from 'umi';
import { Row, Col, notification } from 'antd';
import InfiniteScroll from 'react-infinite-scroller'; //加载更多
import CircleListItem from '@/blocks/circle/circle-list-item';

const UserCircleListQuery = (props) => {
  const dispatch = useDispatch();

  let ajaxFlag = true;

  const initialState = {
    page: props.page || 1, // 当前页数
    per_page: props.per_page || 12, // 每页数量
    initializing: 1,

    url: '',
    loading: true,
    list: [],
    total: 0,
    hasMore: true,
    maxQueryPage: 0,
  };
  const [state, setState] = useState(initialState);

  useEffect(() => {
    queryCircleList(props.userId, {
      page: state.page,
      per_page: state.per_page,
    });
  }, []);

  const queryCircleList = (userId, query) => {
    if (!ajaxFlag) return;
    ajaxFlag = false;

    let list = query.clearList ? [] : state.list;

    dispatch({
      type: 'global/request',
      url: `/users/${userId}/circles`,
      method: 'get',
      payload: query,
      callback: (res) => {
        setTimeout(() => {
          ajaxFlag = true;
        }, 500);
        if (res.code === 0) {
          setState({
            ...state,
            loading: false,
            page: state.page + 1,
            list: list.concat(res.data.list),
            total: res.data.count,
            hasMore: res.data.hasMore,
          });
        } else {
          notification.error({ message: '提示', description: res.message });
        }
      },
    });
  };

  //Masonry布局 - 滚动加载更多
  const LoadMore = (page) => {
    if (!page) return;
    let { per_page, hasMore } = state;

    if (!hasMore) return;
    if (state.maxQueryPage && page > state.maxQueryPage) return;

    if (!ajaxFlag) return;
    ajaxFlag = false;

    setTimeout(function () {
      queryCircleList(props.userId, {
        page: page + 1,
        per_page,
      });
    }, 200);
  };

  const { list, hasMore } = state;

  return (
    <Row>
      <Col xs={0} sm={0} md={3} lg={5} />
      <Col xs={24} sm={24} md={18} lg={14}>
        <InfiniteScroll
          pageStart={0}
          initialLoad={false}
          loadMore={LoadMore}
          hasMore={hasMore}
        >
          <Row gutter={20} style={{ marginBottom: '20px' }}>
            {list.map((item, index) => (
              <Col xs={24} sm={24} md={12} lg={8} key={index}>
                <CircleListItem item={item} />
              </Col>
            ))}
          </Row>
        </InfiniteScroll>
      </Col>
      <Col xs={0} sm={0} md={3} lg={5} />
    </Row>
  );
};

export default UserCircleListQuery;
