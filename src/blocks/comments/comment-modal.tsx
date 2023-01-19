/**
 * CommentModal
 */
import { useEffect, useState } from 'react';
import { useDispatch } from 'umi';
import { Modal, Button, Form, Input } from 'antd';
import { filterStr } from '@/utils/utils';
import styles from './comment-modal.less';

import { Toast } from '@/components';

const FormItem = Form.Item;
const { TextArea } = Input;

interface IProps {
  onRef: any;
  callback: (data: any) => void;
}

interface IState {
  visible: boolean;
  placeholder: string;

  category: string;
  detail_id: string;
  comment_id: string;
  reply_to: string;
}

const CommentModal = (props: IProps) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  let contentRef;
  let ajaxFlag = true;

  const initialState: IState = {
    visible: false,
    placeholder: '写下您的评论...',

    category: '',
    detail_id: '',
    comment_id: '',
    reply_to: '',
  };

  const [state, setState] = useState(initialState);

  useEffect(() => {
    if (props.onRef) {
      props.onRef(this);
    }
  }, []);

  const show = (params) => {
    setState({
      ...state,
      visible: true,
      ...params,
    });
  };

  const hide = () => {
    setState({
      ...state,
      visible: false,
    });
  };

  //确定发表评论
  const submitForm = (e) => {
    e.preventDefault();
    form
      .validateFields()
      .then((values) => {
        let content = filterStr(values.content).trim(); // 过滤特殊符号及两端空格
        if (content === '') {
          form.setFields([
            {
              name: 'content',
              value: '',
              errors: ['请输入评论内容！'],
            },
          ]);
        } else {
          addComment(content);
        }
      })
      .catch((err) => {
        contentRef.focus();
        console.error(err);
      });
  };

  //增加评论
  const addComment = (content) => {
    if (ajaxFlag) return;
    ajaxFlag = false;

    const { category, detail_id, comment_id, reply_to } = state;

    dispatch({
      type: 'global/request',
      url: `/${category}/${detail_id}/comments/${comment_id}/reply`,
      method: 'POST',
      payload: {
        content,
        root_comment_id: comment_id,
        reply_to,
      },
      callback: (res) => {
        if (res.code === 0) {
          props.callback(res.data);
          hide();
        } else {
          Toast.show(res.message);
        }
        setTimeout(() => {
          ajaxFlag = true;
        }, 500);
      },
    });
  };

  const resetForm = (e) => {
    form.resetFields();
    setState({
      ...state,
      comment_id: '',
      reply_to: '',
      placeholder: '写下您的评论...',
    });
  };

  const { visible, placeholder } = state;

  return (
    <Modal
      title="评论"
      width={500}
      centered={true}
      destroyOnClose={true}
      maskClosable={false}
      footer={null}
      open={visible}
      onCancel={hide}
    >
      <div className={styles.container}>
        <Form onFinish={submitForm}>
          <FormItem
            name="content"
            rules={[
              { required: true, message: '请输入评论内容！' },
              { max: 100, message: '不能超过100字！' },
            ]}
          >
            <TextArea
              autoFocus
              allowClear
              autoSize={{ minRows: 4, maxRows: 6 }}
              placeholder={placeholder}
              ref={(c) => (contentRef = c)}
            />
          </FormItem>

          <div className={styles.action}>
            <p className={styles.btns}>
              <Button
                type="primary"
                htmlType="submit"
                className={styles.submit}
              >
                评论
              </Button>
            </p>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default CommentModal;
