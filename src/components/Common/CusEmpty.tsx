/**
 * CusEmpty
 */
import { Empty } from 'antd';

const CusEmpty = () => {
  return(
    <div style={{ padding: '100px 0' }}>
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
    </div>
  )
}

export default CusEmpty;