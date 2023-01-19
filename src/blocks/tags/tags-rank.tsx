/*
 * 标签排名查询
 * itemsPerPage： 总数量，默认10
 * <TagsRank itemsPerPage={10}/>
 */
import { useState, useEffect } from 'react';
import { useDispatch, Link } from 'umi';
import styles from './tags-rank.less';

interface IProps {
  itemsPerPage?: number;
}

interface IState {
  list: any[];
}

const TagsRank = (props: IProps) => {
  const dispatch = useDispatch();

  let ajaxFlag = true;

  const initialState: IState = {
    list: [],
  };

  const [state, setState] = useState(initialState);

  // useEffect(() => {
  //   queryTagsRank({itemsPerPage: props.itemsPerPage});
  // }, []);

  const queryTagsRank = (params) => {
    if (!ajaxFlag) return;
    ajaxFlag = false;

    dispatch({
      type: 'global/request',
      url: '/api/TagsRank',
      method: 'post',
      payload: params,
      callback: (res) => {
        ajaxFlag = true;
        if (res.code === 0) {
          setState({
            list: res.data,
          });
        }
      },
    });
  };

  const { list } = state;

  const RankList = list ? (
    <div className={styles.list}>
      {list.map((topic, index) => (
        <Link to={`/tags/${topic.name}`} key={index}>
          {topic.name}
        </Link>
      ))}
    </div>
  ) : null;

  return (
    <div className={styles.tagsList}>
      <h3>热门标签</h3>
      {RankList}
    </div>
  );
};

export default TagsRank;
