import { useEffect, useState, useRef } from 'react';
import { Link, useDispatch, useSelector } from 'umi';
import { Button, Form, Input } from 'antd';
import { filterStr } from '@/utils/utils';
import { IRootState } from '@/models/index';
import styles from './comment-list.less';

import { Toast } from '@/components';
import SignAuth, { SignAuthRef } from '@/blocks/auth/sign-auth';
import { TextAreaRef } from 'antd/es/input/TextArea';

const FormItem = Form.Item;
const { TextArea } = Input;

interface IProps {
  onRef: any;
  callback: () => void;
  category: string;
  detail_id: string;
  theme: string;
}

interface IState {
  comment_id: string;
  reply_to: string;
  placeholder: string;
}

const CommentForm = (props: IProps) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const account = useSelector((state: IRootState) => state.account);

  const signAuthRef = useRef<SignAuthRef>();
  const inputRef = useRef<TextAreaRef>(null);
  let ajaxFlag = true;

  const initialState: IState = {
    comment_id: '',
    reply_to: '',
    placeholder: '写下您的评论...',
  };

  const [state, setState] = useState(initialState);

  useEffect(() => {
    if (props.onRef) {
      props.onRef(this);
    }
  }, []);

  const focusHandle = () => {
    if (!signAuthRef.current?.check()) {
      inputRef.current?.blur();
    }
  };

  const blurHandle = () => {};

  //确定发表评论
  const submitForm = (e) => {
    e.preventDefault();
    //检查登录状态
    if (!signAuthRef.current?.check()) {
      return;
    }
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
        inputRef.current?.focus();
        console.error(err);
      });
  };

  //增加评论
  const addComment = (content) => {
    if (!ajaxFlag) return;
    ajaxFlag = false;

    const { category, detail_id } = props;

    dispatch({
      type: 'global/request',
      url: `/${category}/${detail_id}/comments`,
      method: 'post',
      payload: {
        content,
      },
      callback: (res) => {
        if (res.code === 0) {
          form.resetFields();
          props.callback();
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
    setState({ comment_id: '', reply_to: '', placeholder: '写下您的评论...' });
  };

  const { isAuth, currentUser } = account;

  return (
    <Form onFinish={submitForm}>
      <FormItem
        name="content"
        rules={[
          { required: true, message: '请输入评论内容！' },
          { max: 100, message: '不能超过100字！' },
        ]}
      >
        <TextArea
          allowClear
          autoSize={{ minRows: 2, maxRows: 4 }}
          placeholder={state.placeholder}
          ref={inputRef}
          onFocus={focusHandle}
          onBlur={blurHandle}
        />
      </FormItem>

      <div className={styles.action}>
        <p className={styles.currentUser}>
          {isAuth ? (
            <Link to={`/users/${currentUser.username}`}>
              {currentUser.nickname}
            </Link>
          ) : (
            <span>游客</span>
          )}
        </p>
        <p className={styles.btns}>
          <Button className={styles.reset} size="small" onClick={resetForm}>
            重置
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            className={styles.submit}
            size="small"
          >
            评论
          </Button>
        </p>
      </div>

      <SignAuth ref={signAuthRef} />
    </Form>
  );
};

export default CommentForm;
