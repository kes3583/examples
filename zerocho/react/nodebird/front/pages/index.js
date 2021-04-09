import AppLayout from '../components/AppLayout';
import React from 'react';
import {useSelector} from 'react-redux';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm'

const Home = () =>  {
  const {isLoggedIn} = useSelector(state => state.user);
  const {mainPosts} = useSelector(state => state.post)
  return (
    <AppLayout>
      {isLoggedIn && <PostForm /> } 
      {mainPosts.map((post, i) => <PostCard key={post.id} post={post} />)}
    </AppLayout>
  );
}

export default Home;