/*
 * 文章列表查询 - 接收参数cateid
 * <ArticleListQuery url={url} query={quert} />
 */
import { useState, useEffect } from 'react';
import { useDispatch } from 'umi';
import { Empty, Skeleton, Pagination } from 'antd';
import { ENV, Storage } from 'metu-ui/dist/utils/index';
import styles from './article-list-query.less';

import ArticleListItem from '@/blocks/article/article-list-item';

interface IProps {
  url: string;
  keyword?: string;
  showEdit?: boolean;
  callback?: (count: number) => void;
}

interface IState {
  loading: boolean;
  total: number;
  list: any[];
  url: string;
  q: string; //筛选关键字
  page: number; //当前页数
  per_page: number;
}

const ArticleListQuery = (props: IProps) => {
  const dispatch = useDispatch();

  let ajaxFlag = true;

  const initialState: IState = {
    loading: true,
    total: 0,
    list: [],
    url: '',
    q: '', //筛选关键字
    page: 1, //当前页数
    per_page: Storage.get(ENV.storage.perPage) || 10,
  };

  const [state, setState] = useState(initialState);

  useEffect(() => {
    queryArticleList(props.url, {
      q: state.q,
      page: state.page,
      per_page: state.per_page,
    });
  }, [props.url, props.keyword]);

  const queryArticleList = (url, query) => {
    if (!ajaxFlag) return;
    ajaxFlag = false;

    dispatch({
      type: 'global/request',
      url,
      method: 'get',
      payload: query,
      callback: (res) => {
        setTimeout(() => {
          ajaxFlag = true;
        }, 500);
        let list = res.data?.list;
        if (res.code === 0) {
          for (let i in list) {
            if (list[i].tags) list[i].tags = list[i].tags.split(',');
          }
          setState({
            ...state,
            url,
            loading: false,
            total: res.data.count,
            list: list,
            page: query.page,
            per_page: query.per_page,
          });
          props.callback && props.callback(res.data.count);
        }
      },
    });
  };

  //分页
  const onChange = (current) => {
    let { url } = state;
    queryArticleList(url, {
      q: state.q,
      page: current,
      per_page: state.per_page,
    });
  };

  const onShowSizeChange = (current, pageSize) => {
    let { url } = state;
    queryArticleList(url, {
      q: state.q,
      page: current,
      per_page: pageSize,
    });
  };

  const { showEdit } = props;
  const { loading, list, total } = state;

  return (
    <div className={styles.articleList}>
      <Skeleton active loading={loading}>
        {list.length > 0 ? (
          list.map((item) => (
            <ArticleListItem key={item._id} item={item} showEdit={showEdit} />
          ))
        ) : (
          <div className={styles.empty}>
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          </div>
        )}
      </Skeleton>

      <div className={styles.pagination}>
        <Pagination
          defaultCurrent={1}
          total={total}
          hideOnSinglePage={true}
          showSizeChanger={true}
          showQuickJumper={true}
          onChange={onChange}
          onShowSizeChange={onShowSizeChange}
        />
      </div>
    </div>
  );
};

export default ArticleListQuery;
