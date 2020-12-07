import React from 'react';
import Hello from './Hello_es6'
import { Welcome } from './Welcome_func'
import { Bye } from './Bye_fuc'
import { WordRelay } from './WordRelayWithHooks'
import { NumberBaseball } from './NumberBaseball'
import { ResponseCheck } from './ResponseCheck'


function App() {
  return (
    <>
      <div>Welcome to my-webpack-react-starter 123456dfdsdfdsfs</div>
      
      <div>Welcome to my-webpack-react-starter 123456dfdsdfdsfs121212</div>
     <Hello />
     <Welcome />
     <Bye />
     <WordRelay name='eunsim' />
     <NumberBaseball />
      <ResponseCheck />
    </>
  )
}

export default App
