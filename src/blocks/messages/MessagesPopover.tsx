/**
 * 消息 - 气泡卡片
 */
import React, { useState } from 'react';
import { Popover } from 'antd';
import MessagesPopoverContent from '@/blocks/Messages/MessagesPopoverContent';

interface IProps {
  children: React.ReactNode;
}

interface IState {
  visible: boolean;
}

const MessagesPopover = (props: IProps) => {
  const initialState: IState = {
    visible: false,
  };

  const [state, setState] = useState(initialState);

  const changeMessageVisible = (visible) => {
    setState({
      visible,
    });
  };

  return (
    <Popover
      title=""
      placement="bottom"
      trigger="click"
      arrowPointAtCenter
      visible={state.visible}
      content={<MessagesPopoverContent />}
      onVisibleChange={changeMessageVisible}
    >
      {props.children}
    </Popover>
  );
};

export default MessagesPopover;
