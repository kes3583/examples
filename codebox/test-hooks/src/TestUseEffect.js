import React, { useState, useEffect } from 'react'


export default function TestUseEffect() {
  const [resourceType, setResourceType] = useState('posts');

  console.log(`render`)
  useEffect(() => {
    
    console.log(`onMount`, resourceType) 
  },[])

  return (
    <>
      <button onClick={() => setResourceType('posts')}>posts</button>
      <button onClick={() => setResourceType('users')}>users</button>
      <button onClick={() => setResourceType('comments')}>comments</button>

      <h1>{resourceType}</h1>
    </>

  )
}
