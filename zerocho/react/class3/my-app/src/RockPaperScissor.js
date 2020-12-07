import React, {Component} from 'react'

const rspCoords = {
  바위: '0',
  가위: '-142px',
  보: '-284px'
}
// const scores = {
//   가위: 1,
//   바위: 0,
//   보: -1
// }

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
  
    this.interval = setInterval(()=>{
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
    },1000)
  }

  componentDidUpdate(){ // 리렌더링후

  }

  componentWillUnmount(){ //컴포넌트 제거되기직전
    clearInterval(this.interval)
  }

  onClickBtn = (c) =>{
    console.log('c', c)
    return false
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
        <div>현재 { score }점</div>
      </>
    )
   
  }

}


export default RockPaperScissor
