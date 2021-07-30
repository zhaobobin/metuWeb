/**
 * 导航 - 搜索
 */
import React from 'react';
import { connect, ConnectProps, Dispatch } from 'umi';
import { RootState } from '@/models/index';
import { SearchOutlined } from '@ant-design/icons';

interface IProps extends ConnectProps {
  dispatch: Dispatch;
}

interface IState {}

const mapStateToProps = (state: RootState) => ({
  account: state.account,
  loading: state.loading.models.account,
});
const connector = connect(mapStateToProps);

class Tpl extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  render() {
    return <div></div>;
  }
}

export default connector(Tpl);
