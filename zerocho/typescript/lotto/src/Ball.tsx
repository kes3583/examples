import React, {FunctionComponent, memo} from 'react'
import styled  from 'styled-components'

const StyledBall = styled.div`
 display: inline-block;
  border: 1px solid black;
  border-radius: 20px;
  width: 40px;
  height: 40px;
  line-height: 40px;
  font-size: 20px;
  text-align: center;
  margin-right: 20px;
`;


//memo - class의 pureComponent처럼 렌더링을 하지 않게 한다. 
const Ball:FunctionComponent<{number:number}> = memo( ({number}) =>  {
  let background
  if (number <= 10) {
    background = 'red';
  } else if (number <= 20) {
    background = 'orange';
  } else if (number <= 30) {
    background = 'yellow';
  } else if (number <= 40) {
    background = 'blue';
  } else {
    background = 'green';
  }
  return(
      <>
        <StyledBall className="ball" style={{background}}>{number}</StyledBall>
      </>
    )   
})

export default Ball
