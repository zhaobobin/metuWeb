/**
 * 导航 - 搜索
 */
import React, { ChangeEvent } from 'react';
import { connect, ConnectProps, Dispatch } from 'umi';
import { RootState } from '@/models/index';
import { routerRedux } from 'dva/router';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import styles from './global-header-search.less';

const { Search } = Input;

interface IProps extends ConnectProps {
  dispatch: Dispatch;
}

interface IState {
  show: boolean;
  value: string;
}

const mapStateToProps = (state: RootState) => ({
  account: state.account,
  loading: state.loading.models.account,
});
const connector = connect(mapStateToProps);
class GlobalHeaderSearch extends React.Component<IProps, IState> {
  private value: string;

  constructor(props: IProps) {
    super(props);
    this.value = '';
    this.state = {
      show: false,
      value: '',
    };
  }

  show = () => {
    this.setState({
      show: true,
    });
  };

  hide = () => {
    if (this.value) return;
    this.setState({
      show: false,
    });
  };

  onChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    this.value = value.replace(/(^\s*)|(\s*$)/g, ''); // 去除两端空格
  };

  onSearch = (value: string) => {
    if (!this.value) return;
    // value = value.replace(/(^\s*)|(\s*$)/g, ""); // 去除两端空格
    const keyword = encodeURIComponent(this.value);
    this.props.dispatch(routerRedux.push(`/search?type=content&q=${keyword}`));
  };

  render() {
    const { show } = this.state;

    return (
      <div className={styles.search}>
        {show ? (
          <Search
            autoFocus
            placeholder="搜索"
            onChange={this.onChange}
            onSearch={this.onSearch}
            onBlur={this.hide}
          />
        ) : (
          <span className={styles.icon}>
            <SearchOutlined onClick={this.show} />
          </span>
        )}
      </div>
    );
  }
}

export default connector(GlobalHeaderSearch);
