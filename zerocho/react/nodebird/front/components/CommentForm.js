import React, { useCallback, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import useInput from '../hooks/useInput';
import { ADD_COMMENT_REQUEST } from '../reducers/post';

const CommentForm = ({ post }) => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.me?.id);
  const { addCommentDone } = useSelector((state) => state.post);
  const { addCommentLoading } = useSelector((state) => state.post);
  const [commentText, onChangeCommentText, setCommentText] = useInput('');
  const onSubmitComment = useCallback(() => {
    console.log('submit', post.id, commentText, id);
    // if (post.id === id) {
    //   console.log(`submit`, post.id, text);
    // }
    useEffect(() => {
      if (addCommentDone) {
        setCommentText('');
      }
    }, [commentText]);

    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: { content: commentText, postId: post.id, userId: id },
    });
  }, [commentText, id]);
  return (
    <Form onFinish={onSubmitComment}>
      <Form.Item>
        <Input.TextArea
          value={commentText}
          onChange={onChangeCommentText}
          row={4}
        />
        <Button
          type="primary"
          htmlType="submit"
          loading={addCommentLoading}
        >
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
