import Axios, { AxiosPromise } from 'axios'

function getPosts(): AxiosPromise {
  return Axios.get('https://jsonplaceholder.typicode.com/posts')
}

export default getPosts
