import React, { useCallback } from 'react';
import { Form, Input, Button } from 'antd';
import useInput from '../hooks/useInput';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const CommentForm = ({ post }) => {
  const id = useSelector(state => state.user.me?.id);
  const [text, onChangeCommentHandler] = useInput();
  const onSubmitComment = useCallback(() => {
    console.log(`submit`, post.id, text, id);
    // if (post.id === id) {
    //   console.log(`submit`, post.id, text);
    // }
  }, [text]);
  return (
    <Form onFinish={onSubmitComment}>
      <Form.Item>
        <Input.TextArea
          value={text}
          onChange={onChangeCommentHandler}
          row={4}
        />
        <Button type="primary" htmlType="submit">
          댓글달기
        </Button>
      </Form.Item>
    </Form>
  );
};

// 타입을 쓰면 서비스가 안정적
CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
};

export default CommentForm;
