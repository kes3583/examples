import React, {Component} from 'react'

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


class RockPaperScissor extends Component {
//1. Mount - constructor->render->ref->componentDidMount->
//2. Update - (setState/new props 바뀔때) -> shouldComponentUpdate -> update Doms and refs -> componentDidUpdate
//3. Unmount - 부모가 나를 제거할때 -> componentWillUnmount -> 소멸
  state = {
    result:'',
    imgCoord: '0',
    score: 0,
  }
  interval;
  componentDidMount(){ //컴포넌트 첫 렌더링// 비동기요청 작업   
    this.interval = setInterval(this.playHand, 100)
  }

  componentWillUnmount(){ //컴포넌트 제거되기직전
    clearInterval(this.interval)
  }

  onClickBtn = (c) =>{
    console.log('click :>> ', isRun);
    if(isRun){
        console.log('click :>> ', isRun);
        return;
        
    }

    isRun = true;
    clearInterval(this.interval)
    const myScore = scores[c] //내점수
    const cpuScore = scores[computerChoice(this.state.imgCoord)] // 선택되었을때의 imgCoord 매칭되는 후보를 찾아 점수를 매칭시켜라. 
    const diff = myScore - cpuScore //점수차
    if (diff === 0) {
      this.setState((prevState) => {
       
        return {
          result:'무승부',
          score:prevState.score,
        }       
      })
    }else if([-1, 2].includes(diff)){
      this.setState((prevState) => {
        console.log('prevScore :>> ', prevState);
        return {
          result:'이겼습니다.',
          score:prevState.score + 1,
        }        
      })
    }else{
      this.setState((prevState)=>{ // 1, -2
        console.log('prevScore :>> ', prevState);
        return {
          result:'졌습니다.',
          score:prevState.score - 1
        }        
      })
    }
    setTimeout(()=>{
      this.interval = setInterval(this.playHand,100)
      isRun = false
    },2000)
    
       
    
  }

  playHand = () =>{
    const {imgCoord} = this.state; // 비동기 함수 사용시 this 사용 주의       
    if(imgCoord === rspCoords.바위){
      this.setState({
        imgCoord: rspCoords.가위
      })
    } else if(imgCoord === rspCoords.가위){
      this.setState({
        imgCoord: rspCoords.보
      })
    }else if(imgCoord === rspCoords.보){
      this.setState({
        imgCoord: rspCoords.바위
      })
    }
  }

  render() {
    const {result, imgCoord, score} = this.state;
    return(
      <>
        <div id="computer" style={{background:`url(https://en.pimg.jp/023/182/267/1/23182267.jpg)  ${imgCoord} 0`}}>
          가위 바위 보
        </div>
        <div>
            <button id="rock" className="btn" onClick={() => this.onClickBtn('바위')}>바위</button> 
            <button id="scissor" className="btn" onClick={() => this.onClickBtn('가위')}>가위</button>
            <button id="paper" className="btn" onClick={() => this.onClickBtn('보')}>보</button>
        </div>
        <div>{result}</div>
        <div>현재{score}점</div>
      </>
    )
   
  }

}


export default RockPaperScissor
