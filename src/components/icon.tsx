import React from 'react';
import * as Icon from '@ant-design/icons';

interface IProps {
  type: string;
  style?: React.CSSProperties;
  theme?: string;
}

function CusIcon(props: IProps) {
  return React.createElement(Icon[props.type], {
    style: props.style,
    theme: props.theme,
  });
}

CusIcon.defaultProps = {
  style: { fontSize: '16px', color: '#666' },
};

export default CusIcon;
