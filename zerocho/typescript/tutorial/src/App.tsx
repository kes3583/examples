import React, {useEffect, useState} from 'react';
import './App.css';
//import Lotto from "./Lotto";
import { IPost } from "./IPost";
import getPosts from "./get-post";
import Posts from "./Posts";


function App() {
  const [posts, setPosts] = useState<IPost[]>([])

  useEffect(() => {

    getPosts()
    .then( (response) => { 
      console.log(response.data) 
      setPosts(response.data)
    } );
       
  }, [])

  return (
    <div className="App">
     {/* <Lotto/> */}
     

     <ul className="posts">
        {posts.map((post:IPost) => (
           <Posts key={post.id} {...post}/>
        ))}
       
      </ul>
    </div>
  );
}

export default App;
