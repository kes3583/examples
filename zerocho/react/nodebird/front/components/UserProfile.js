import React, {useCallback} from 'react';
import {Card, Avatar, Button } from 'antd';

const UserProfile = ({setIsLoggedIn}) => {
  const onLogOut = useCallback(() =>{
    setIsLoggedIn(false)   
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