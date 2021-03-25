import React, {useCallback} from 'react';
import {Card, Avatar, Button } from 'antd';
import{useDispatch} from 'react-redux';
import {loginAction} from '../reducers/action'

const UserProfile = () => {
  const dispatch = useDispatch();

  const onLogOut = useCallback(() =>{
    dispatch(loginAction())   
  }, [])

  return (
    <Card
      style={{ width: 300 }}
      
      actions={[
        <div key="tweet">tweet <br/>0</div>,
        <div key="followings">followings <br/> 0</div>,
        <div key="followers">followers<br/>0</div>,
      ]}
    >
      <Card.Meta
        avatar={<Avatar>Ch</Avatar>}
        title="cherry"
        description="This is Cherry"
      />
      <Button onClick={onLogOut}>Log Out</Button>
  </Card>
  );
}

export default UserProfile;