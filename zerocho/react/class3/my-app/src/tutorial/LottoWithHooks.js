import React, {useState, useRef, useEffect, useMemo, useCallback} from 'react'
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

//함수컴포넌트는 전체가 재실행된다. 
function Lotto () {
  //hooks는 선언 순서가 중요함.
  const [winBalls, setWinBalls] = useState([]);
  const lottoNumbers = useMemo(() => getWinNumbers(), []); //두번째 인자가 안바뀌면 getWinNumbers를 불러오지 않는다. 함수의 리턴 값을 기억한다. useCallback은 함수 자체를 기억하여 컴포넌트가 재실행되도 함수는 재실행되지않는다. 
  const [winNumbers, setWinNumbers] = useState(lottoNumbers);
  const [bonus, setBonus] = useState(null);
  const [redo, setRedo] = useState(false);
  const timeouts  = useRef([]);
  
  useEffect(() => {
    console.log('use Effect :>> ');
    //componentDidMount
    console.log('run timeout');
    
    for (let i = 0; i < winNumbers.length - 1; i++) {
      console.log('did mount >> for');
      
      timeouts.current[i] = setTimeout( () => { // settimeout 은 arrow function 사용 , timeouts.current[i]는 timeouts.current가 바뀌는게 아니다. 단순히 current에 배열추가. 
        console.log('did mount >> timeout');
        setWinBalls((prevWinBalls)=>[...prevWinBalls, winNumbers[i]])        
      }, (i + 1) * 1000)  
      
      //console.log('timeouts.current[i]', timeouts.current[i]);
    }

    console.log('timeout bonus');
    timeouts.current[6] = setTimeout(() => {
      setBonus(winNumbers[6])
      setRedo(true)
    }, 7000);
    return () => {
      timeouts.current.forEach((v)=>{
        clearTimeout(v) // compoenentWillUnmount
      })
    };
  }, [winNumbers]); // 기본값은 빈 배열이면 componentDidMount, 배열에 업데이트 될 요소가 있으면 componentDidMount 와 componentDidUpdate 둘다 실행
 
  const onClickRedo = useCallback( () => { // 자식한테 props로 전달할때 useCallback을 써서 한번한 기억한 함수를 전달한다. 안쓰면 컴포넌트가 리런데링될때마다 전달한다.
      console.log('winNumbers', winNumbers);
      setWinNumbers(getWinNumbers())
      setWinBalls([])
      setBonus(null)
      setRedo(false)
      timeouts.current = []
    },[winNumbers]) //인자가 없으면 winNumbers의 바뀐값을 기억못한다. 업데이트 안됨. 

  

  return(
    <>
      <div>당첨 숫자</div>
      <div id="결과창">
        {winBalls}
        {winBalls.map((v) => <Ball key={v} number={v} />)}
      </div>
      <div>보너스!</div>
      {bonus && <Ball number={bonus} />}
      {redo && <button onClick={onClickRedo}>한번더</button>}
    </>
  )

}

export default Lotto
