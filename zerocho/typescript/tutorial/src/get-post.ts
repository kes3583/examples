import Axios from 'axios'
import { IPost } from "./IPost";

function getPosts(){
  return Axios.get<IPost[]>('https://jsonplaceholder.typicode.com/posts')
}

export default getPosts