import React, {Component} from 'react'
import Ball from "./Ball"

console.log('outer class');
//재사용을 위하여 클래스 밖에다가 씀.
function getWinNumbers(params) {
  console.log('getWinNumbers');
  const candidateNumbers = Array(45).fill().map((el, i) =>  i + 1)
  const shuffle = []
  while(candidateNumbers.length > 0){
    shuffle.push(candidateNumbers.splice(Math.floor(Math.random() * candidateNumbers.length),1)[0]) //0번째 1개 값만 잘라내서 가져옴. 45개 숫자를 랜덤으로 shuffle에 저장
  }
  const bonusNumber = shuffle[shuffle.length - 1]
  const winNumbers = shuffle.slice(0,6).sort((p,c)=>p-c)
  return [...winNumbers, bonusNumber]
}

class LottoWithClass extends Component {
  state = {
    winNumbers: getWinNumbers(),
    winBalls: [],
    bonus: null,
    redo: false,
  }
  timeouts = []

  runTimeout = () => {
    console.log('run timeout');
    const {winNumbers} = this.state
    for (let i = 0; i < winNumbers.length - 1; i++) {
      console.log('did mount >> for');
      this.timeouts[i] = setTimeout( () => { // settimeout 은 arrow function 사용 
        console.log('did mount >> timeout');
        this.setState((prevState) => {
          return {
            winBalls:[...prevState.winBalls, winNumbers[i]]
          }
        })
      }, (i + 1) * 1000)      
    }
    this.timeouts[6] = setTimeout(() => {
      this.setState({
        bonus: winNumbers[6],
        redo:true
      })
    }, 7000);
  }
  componentDidMount(){
    console.log('did mount');
    this.runTimeout()
  }

  componentDidUpdate(prevProps, prevState){
    console.log('did update');
    // console.log('prevProps :>> ', prevProps);
    // console.log('prevState :>> ', prevState);
    if (this.state.winBalls.length === 0) {
      this.runTimeout()
    }
  }

  componentWillUnmount(){
    console.log('unmount');
    console.log('this.timeouts :>> ', this.timeouts);
    this.timeouts.forEach((v)=>{
      clearTimeout(v)
    })
    
  } 
  
  onClickRedo = () => {
    this.setState({
      winNumbers: getWinNumbers(),
      winBalls: [],
      bonus: null,
      redo: false,
    })
    this.timeouts = []
  }

  render() {
    const {winBalls, bonus, redo} = this.state;
    console.log('render :>> ');
    return(
      <>
        <div>당첨 숫자</div>
        <div id="결과창">
          {winBalls}
          {winBalls.map((v) => <Ball key={v} number={v} />)}
        </div>
        <div>보너스!</div>
        {bonus && <Ball number={bonus} />}
        {redo && <button onClick={this.onClickRedo}>한번더</button>}
      </>
    )
   
  }


}

export default LottoWithClass
