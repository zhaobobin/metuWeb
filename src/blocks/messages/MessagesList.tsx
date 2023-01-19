/**
 * 消息列表
 */
import { useState, useEffect } from 'react';
import { useDispatch } from 'umi';
import styles from './MessagesList.less';

interface IProps {
  type: string;
}

interface IState {
  type: string;
  list: string;
  count: number;
}

const MessageList = (props: IProps) => {
  const dispatch = useDispatch();

  let ajaxFlag: boolean = true;

  const initialState: IState = {
    type: '',
    list: '',
    count: 0,
  };

  const [state, setState] = useState(initialState);

  useEffect(() => {
    refresh(props.type);
  }, []);

  // UNSAFE_componentWillReceiveProps(nextProps){
  //   if(nextProps.type !== this.props.type){
  //     this.refresh(nextProps.type);
  //   }
  // }

  const queryMessagesList = (type, list) => {
    if (!ajaxFlag) return;
    ajaxFlag = false;
    // console.log(type)

    dispatch({
      type: 'account/request',
      url: `/messages?type=${type}`,
      method: 'get',
      payload: {},
      callback: (res) => {
        setTimeout(() => {
          ajaxFlag = true;
        }, 500);
        if (res.code === 0) {
          setState({
            type,
            list: list.concat(res.data.list),
            count: res.data.count,
          });
        }
      },
    });
  };

  const refresh = (type) => {
    let list = [];
    queryMessagesList(type, list);
  };

  const loadMore = (type) => {
    queryMessagesList(type, state.list);
  };

  return <div className={styles.container}>MessageList</div>;
};

export default MessageList;
