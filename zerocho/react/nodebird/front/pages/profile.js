import React, { useSelector } from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';

import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';

const Profile = () => {
  const { me } = useSelector(state => state.user);

  return (
    <>
      <Head>
        <title>My profile</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header="followings" data={me.Followings} />
        <FollowList header="followers" data={me.Followers} />
      </AppLayout>
    </>
  );
};

export default Profile;
