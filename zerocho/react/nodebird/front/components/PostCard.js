import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Card, Popover, Button, List, Avatar, Comment } from 'antd';
import {
  RetweetOutlined,
  HeartOutlined,
  EllipsisOutlined,
  MessageOutlined,
  HeartTwoTone,
} from '@ant-design/icons';
import PostImages from '../components/PostImages';
import CommentForm from '../components/CommentForm';
import PostCardContent from '../components/PostCardContent';

const PostCard = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [commentFormOpend, setCommentFormOpend] = useState(false);
  const id = useSelector(state => state.user.me?.id);

  const onToggleLike = useCallback(() => {
    console.log('click');
    setLiked(prev => !prev); //이전상태와 비교
  }, [liked]);

  const onToggleComment = useCallback(() => {
    setCommentFormOpend(prev => !prev); //이전상태와 비교
  }, [commentFormOpend]);

  return (
    <div>
      <Card
        cover={
          post.Images[0] &&
          post.Images.map((v, i) => <PostImages key={i} image={v} />)
        }
        style={{ width: 300 }}
        actions={[
          <RetweetOutlined key="retweet" />,
          liked ? (
            <HeartTwoTone
              twoToneColor="#2b2f96"
              onClick={onToggleLike}
              key="heart"
            />
          ) : (
            <HeartOutlined key="heart" onClick={onToggleLike} />
          ),
          <MessageOutlined key="message" onClick={onToggleComment} />,
          <Popover
            key="popover"
            content={
              <Button.Group>
                {id && post.User.id === id ? (
                  <>
                    <Button type="primary"> 수정 </Button>
                    <Button type="danger"> 삭제 </Button>
                  </>
                ) : (
                  <Button type="danger"> 신고 </Button>
                )}
              </Button.Group>
            }
          >
            <EllipsisOutlined key="ellipsis" />
          </Popover>,
        ]}
      >
        <Card.Meta
          avatar={<Avatar> {post.User.nickname[0]} </Avatar>}
          title={post.User.nickname}
          description={<PostCardContent postContent={post.content} />}
        />
      </Card>
      {commentFormOpend && (
        <div>
          <CommentForm post={post} />
          <List
            header={`${post.Comments.length}개의 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments}
            renderItem={item => (
              <List.Item>
                <Comment
                  author={item.User.nickname}
                  avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                  content={item.body}
                />
              </List.Item>
            )}
          />
        </div>
      )}
    </div>
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
