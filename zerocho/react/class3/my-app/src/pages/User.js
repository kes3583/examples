import React from 'react';
import {useParams} from 'react-router'

//함수컴포넌트는 전체가 재실행된다. 
function User () {
 console.log('mount :>> ');
 const {firstname, lastname} = useParams()
  return(
    <>
      <div>User { firstname } {lastname} </div>
      
    </>
  )

}

export default User
