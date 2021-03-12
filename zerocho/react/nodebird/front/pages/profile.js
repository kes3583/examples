import React from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';

import NicknameEditForm from '../components/NicknameEditForm'
import FollowList from '../components/FollowList';

const Profile = () => {
  const followerList = [{nickname:'cherry'},{ nickname:'ddongddong'}, {nickname:'blossom'}]
  const followingList = [{nickname:'lovelycherry'}, {nickname:'ddongddong'}, {nickname:'april'}]

  return (
    <>
      <Head>                              
        <title>My profile</title>
      </Head>
      <AppLayout>
        <NicknameEditForm></NicknameEditForm>
        <FollowList header="followings" data={followingList}></FollowList>
        <FollowList header="followers" data={followerList}></FollowList>
      </AppLayout>
    </>
  );
}

export default Profile;