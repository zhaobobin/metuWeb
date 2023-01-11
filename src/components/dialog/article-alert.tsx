import { useState, useEffect } from 'react';
import { Modal } from 'antd';
import styles from './article-alert.less';

const ArticleAlert = (props) => {
  const initialState = {
    visible: false,
  };

  const [state, setState] = useState(initialState);

  useEffect(() => {
    props.Refs = this;
  }, []);

  // const show = () => {
  //   setState({
  //     visible: true,
  //   });
  // };

  // const close = () => {
  //   setState({
  //     visible: false,
  //   });
  // };

  const handleCancel = (e) => {
    setState({
      visible: false,
    });
  };

  const { visible } = state;
  const { title, content } = props;

  return (
    <Modal
      title={title}
      centered={true}
      open={visible}
      onCancel={handleCancel}
      className={styles.modalArticleAlert}
    >
      <div
        className={styles.ArticleDetail}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </Modal>
  );
};

export default ArticleAlert;
