import React, {memo} from 'react';

// function Tries({tryInfo}) { 
//   return (
//     <>
//       <li><b>{tryInfo.try}</b> - {tryInfo.result}</li>
//     </>
//   )
    
// }
const Tries = memo( ({tryInfo}) => { 
  return (
    <>
      <li><b>{tryInfo.try}</b> - {tryInfo.result}</li>
    </>
  )
    
})

export default Tries 
