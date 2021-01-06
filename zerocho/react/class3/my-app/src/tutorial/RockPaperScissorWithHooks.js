import React, {useState, useRef, useEffect} from 'react'

const rspCoords = {
  바위: '0',
  가위: '-142px',
  보: '-284px'
}
const scores = {
  가위: 1,
  바위: 0,
  보: -1
}
const computerChoice = (imgCoord) =>{
  return Object.entries(rspCoords).find((v)=>{
    console.log('v',v) 
    return v[1] === imgCoord //true이면 find 종료
  })[0]
}

let isRun = false;

function RockPaperScissorWithHooks () {
  const [result, setResult] = useState('');
  const [score, setScore] = useState(rspCoords.바위);
  const [imgCoord, setImgCoord] = useState('0');
  const interval = useRef();

  useEffect(() => {
    console.log('start :>> ');
    interval.current = setInterval(playHand, 200)
    return () => {
      clearInterval(interval.current)
    };
  }, [imgCoord]); // 다시 실행할 값만 넣는다. 

  function onClickBtn(c) {
    if(isRun){
        console.log('click :>> ', isRun);
        return;        
    }

    isRun = true;
    clearInterval(interval.current)
    const myScore = scores[c] //내점수
    const cpuScore = scores[computerChoice(imgCoord)] // 선택되었을때의 imgCoord 매칭되는 후보를 찾아 점수를 매칭시켜라. 
    const diff = myScore - cpuScore //점수차
    if (diff === 0) {
      setResult('무승부')
      
    }else if([-1, 2].includes(diff)){
      setResult('이겼다')
      setScore((prevScore) => prevScore + 1)
    }else{
      setResult('졌다')
      setScore((prevScore) => prevScore - 1)
    }
    setTimeout(()=>{
      interval.current = setInterval(playHand,100)
      isRun = false;
    },2000)
  }

  function playHand () {      
    if(imgCoord === rspCoords.바위){
      setImgCoord(rspCoords.가위)
    } else if(imgCoord === rspCoords.가위){
      setImgCoord(rspCoords.보)
    }else if(imgCoord === rspCoords.보){
      setImgCoord(rspCoords.바위)
    }
  }

  return (
    <>
      <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg)  ${imgCoord} 0` }}>
              가위 바위 보
      </div>
      <div>
        <button id="rock" className="btn" onClick={() => onClickBtn('바위')}>바위</button>
        <button id="scissor" className="btn" onClick={() => onClickBtn('가위')}>가위</button>
        <button id="paper" className="btn" onClick={() => onClickBtn('보')}>보</button>
      </div>
      <div>{result}</div>
      <div>현재{score}점</div>
    </>
  );
}

export default RockPaperScissorWithHooks
