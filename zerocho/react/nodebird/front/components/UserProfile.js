import React, { useCallback } from 'react';
import { Card, Avatar, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { logoutRequestAction } from '../reducers/user';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { me, logoutLoading } = useSelector((state) => state.user);

  const onLogOut = useCallback(() => {
    dispatch(logoutRequestAction());
  }, []);

  return (
    <Card
      style={{ width: 300 }}
      actions={[
        <div key="tweet">
          tweet <br />{me.Posts.length}
        </div>,
        <div key="followings">
          followings <br /> {me.Followings.length}
        </div>,
        <div key="followers">
          followers
          <br />{me.Followers.length}
        </div>,
      ]}
    >
      <Card.Meta avatar={<Avatar>me.nickname</Avatar>} title={me.nickname} />
      <Button onClick={onLogOut} loading={logoutLoading}>
        Log Out
      </Button>
    </Card>
  );
};

export default UserProfile;
