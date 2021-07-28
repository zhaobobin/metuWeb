/**
 * loading
 */
import { Spin } from 'antd';

const Loading = ({padding = '200px', delay = 100}) => {

  const style = {
    padding
  };

  return(
    <div style={style}>
      <Spin size="large" delay={delay}/>
    </div>
  )
};

export default Loading
