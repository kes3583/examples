import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Card, Popover, Button } from 'antd';
import {
  RetweetOutlined,
  HeartOutlined,
  EllipsisOutlined,
  MessageOutlined,
} from '@ant-design/icons';
import PostImages from '../components/PostImages';

const PostCard = ({ post }) => {
  const { id } = useSelector(state => state.user.me?.id);

  const content = (
    <div>
      <Button type="primary"> 수정 </Button>
      <Button type="danger"> 삭제 </Button>
    </div>
  );

  return (
    <Card
      cover={post.Images[0] && <PostImages images={post.Images} />}
      title={post.User.nickname}
      extra={<a href="#">More</a>}
      style={{ width: 300 }}
      actions={[
        <RetweetOutlined key="retweet" />,
        <HeartOutlined key="heart" />,
        <MessageOutlined key="message" />,
        <Popover key="popover" content={content}>
          <EllipsisOutlined key="ellipsis" />
        </Popover>,
      ]}
    >
      {/* <Image />
      <Content /> */}
      {/* <CommentForm />
      <Comments /> */}
    </Card>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object, //post처럼 shape로 풀어줄수있다.
    content: PropTypes.string,
    createdAt: PropTypes.object,
    Comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default PostCard;
