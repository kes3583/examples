import React, {FunctionComponent, memo} from 'react'
import { IPost } from "./IPost";

//memo - class의 pureComponent처럼 렌더링을 하지 않게 한다. 
const Posts:FunctionComponent<IPost> = memo( (post:IPost) =>  {
  
  return(
      <>
       
           <li key={post.id}>
            <h3>{post.id}</h3>
            <h4>{post.title}</h4>
            <p>{post.body}</p>
          </li>
       
      </>
    )   
})

export default Posts
