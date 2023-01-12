/*
 * 文章排名查询
 * category：分类
 * itemsPerPage： 总数量，默认10
 * <ArticleRank itemsPerPage={10}/>
 */
import { useState, useEffect } from 'react';
import { useDispatch, Link } from 'umi';
import { notification } from 'antd';
import {
  UserOutlined,
  ClockCircleOutlined,
  EyeOutlined,
  MessageOutlined,
} from '@ant-design/icons';

import dayjs from 'dayjs';
// import { ENV, Storage } from '@/utils';

import styles from './article-rank.less';

interface IProps {
  category?: string;
}

interface IState {
  list: any[];
}

const ArticleRank = (props: IProps) => {
  const dispatch = useDispatch();

  let ajaxFlag = true;

  const initialState: IState = {
    list: [],
  };

  const [state, setState] = useState(initialState);

  // useEffect(() => {
  //   queryArticleRank(props);
  // }, []);

  // useEffect(() => {
  //   queryArticleRank(props);
  // }, [props.category]);

  const queryArticleRank = (props) => {
    if (!ajaxFlag) return;
    ajaxFlag = false;

    let params = {
      category: props.category ? props.category : '',
      parent: props.parent ? props.parent : '',
      pageSize: props.pageSize ? props.pageSize : 10,
    };

    dispatch({
      type: 'global/request',
      url: '/api/ArticleRank',
      method: 'POST',
      payload: params,
      callback: (res) => {
        ajaxFlag = true;
        if (res.code === 0) {
          setState({
            list: res.data,
          });
        } else {
          notification.error({ message: '提示', description: res.message });
        }
      },
    });
  };

  const { list } = state;

  return (
    <div className={styles.rankList}>
      <h3>推荐阅读</h3>
      {list.length && (
        <ul className={styles.list}>
          {list.map((topic, index) => (
            <li className={styles.item} key={index}>
              <Link
                to={`/course/${topic._id}/${topic.title}-by-${topic.author.nickname}`}
              >
                <strong className={styles.title}>{topic.title}</strong>
                <p className={styles.desc}>{topic.description}</p>
                <p className={styles.info}>
                  <span>
                    <UserOutlined /> {topic.author.nickname}
                  </span>
                  <span>
                    <ClockCircleOutlined />{' '}
                    {dayjs(topic.createtime).format('YYYY-MM-DD')}
                  </span>
                  <span>
                    <EyeOutlined /> {topic.views}
                  </span>
                  <span>
                    <MessageOutlined /> {topic.comments.length}
                  </span>
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ArticleRank;
