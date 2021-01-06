import React, { useState, useRef} from 'react';
import {useLocation, useHistory} from 'react-router'
import Tries from './../tutorial/Tries'

function getNumbers() {
    const candidateNumbers = [1,2,3,4,5,6,7,8,9]
    const numberArray=[]
    for (let index = 0; index < 4; index++) {
      const pickedFourNumbers = candidateNumbers.splice(Math.floor(Math.random() * (9 - index)), 1)[0]
      numberArray.push(pickedFourNumbers)   
    }
    return numberArray
}

//함수컴포넌트는 전체가 재실행된다. 
function BaseBall() {
  const location = useLocation()
  const history = useHistory()
  console.log('location :>> ', location);
  console.log('history :>> ', history);

  function goBackHandle(params) {
    history.goBack()
  }

  const [answer,setAnswer] = useState(getNumbers())
  const [value,setValue] = useState('')
  const [result, setResult] = useState('')
  const [tries, setTries] = useState([])
  const InputRef = useRef(null) 

  // Update the document title using the browser API
  function onChangeInput(e){
    console.log('answerNumbers',answer)
    setValue(e.target.value)
  }

  function onSubmitForm(e) {
    e.preventDefault();
    if (value === answer.join('')) {
      setResult('홈런!')
      setTries((prevTries) => {
        return  [...prevTries, {try:value, result:'홈런!'}]         
      })
      setValue('')
      setAnswer(getNumbers())
      setTries([])
      InputRef.current.focus()
    }else{
      const triesNumbers = value.split('').map((v) => parseInt(v))
      let strike = 0
      let ball = 0
     
      if (tries.length >= 9) { // 10번 넘게 틀린 경우
        setResult('10번 넘게 틀려서 실패! 답은' + answer.join(',') + '였습니다!')
        alert('restart this game')
        setValue('')
        setResult('')
        setAnswer(getNumbers())
        setTries([])
        
      } else { // 10번 미만으로 틀린 경우

        for (var i = 0; i <= 3; i += 1) {
          if (Number(triesNumbers[i]) === answer[i]) { // 같은 자리인지 확인
            console.log('같은 자리?')
            strike += 1
          } else if (answer.indexOf(Number(value[i])) > -1) { // 같은 자리는 아니지만, 숫자가 겹치는지 확인
            console.log('겹치는 숫자?')
            ball += 1
          }
        }
        setValue('')
        setTries((prevTries) => {
          return [...tries, {try:value, result:`${strike} 스트라이크, ${ball} 볼입니다.`}]
        })
        InputRef.current.focus()
      } 
    }    
  }
  
  return(
    <>
      <div>BaseBall</div>
      <div>Location = {location.pathname}</div>
      <div>From = {location.state.from}</div>
      <button onClick={goBackHandle}>go back to previous page</button>

      <h1>{result}</h1>
      <form onSubmit={onSubmitForm}>
        <input maxLength={4} type="number" ref={InputRef} value={value} onChange={onChangeInput} /> 
        
        <button>입력</button>       
      </form>
      <div>시도 : {tries.length} </div>
    <ul>
        {tries.map( (v,i) => {
          return (
            <Tries key={v.try + `${i+1}차 시도`} tryInfo={v} index={i} />
          )
        })}
      </ul>

    </>
  )

}

export default BaseBall
