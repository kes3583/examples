import React, {useState, useRef} from 'react';

const ResponseCheck = () => { 

  const [state, setState] = useState('waiting'); //useState는 값이 바뀌면 다시 render가 된다.
  const [message, setMessage] = useState('Click to start!');
  const [result, setResult] = useState([]);

  const timeout = useRef(null); //this를 설정해준다. re-render가 안됨.
  const startTimePoint = useRef(); //useRef 는 current로 접근하라. 
  const endTimePoint = useRef();

  function onClickScreen(params) {
    //waiting = aqua, ready = red, now = greenyellow

    if (state === 'waiting') {

      setMessage('초록색이되면 클릭하세요')
      setState('ready')
      timeout.current = setTimeout(() => {
        setState('now')
        setMessage('Click Now!')
        startTimePoint.current = new Date();
      }, Math.floor(Math.random() * 1000) + 2000) //2~3초 뒤
      
    } else if(state === 'ready'){
      clearTimeout(timeout.current)
      setMessage('Oops! too early! click as soon as green card shows ')
      setState('waiting')      
      
    } else if(state === 'now'){
      
      endTimePoint.current = new Date();
      setState('waiting')     
      setMessage('click to start')     
      setResult((prevResult) => {
        return [...prevResult, endTimePoint.current - startTimePoint.current]
      })
    }
    
  }

  function onReset(params) {
    return setResult([])
    
  }

  function renderAverage(params) {
    return result.length === 0 
    ? null 
    : <>
      <div>평균시간: {result.reduce((a,c)=> a + c)/result.length}ms</div> 
      <button onClick={onReset}>reset</button>
      </>
  }

  return (
    <>
      <div id="screen" className={state} onClick={onClickScreen}>
        <b>{message}</b>
      </div>
      {renderAverage()}      
    </>
  )
    
}

export {ResponseCheck}
