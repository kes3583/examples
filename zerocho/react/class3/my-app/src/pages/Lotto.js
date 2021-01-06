import React from 'react';
import LottoWithClass from '../tutorial/LottoWithClass'

//함수컴포넌트는 전체가 재실행된다. 
function Lotto () {
 
  return(
    <>
      <h1>Lotto</h1>
      <LottoWithClass />
    </>
  )

}

export default Lotto
