import * as React from 'react';
import { useState, useCallback, useRef } from 'react';


const GuGuDan = () => {
  const [firstNum, setFirstNum] = useState(Math.ceil(Math.random() * 9));
  const [secondNum, setSecondNum] = useState(Math.ceil(Math.random() * 9));
  const [value, setValue] = useState('');
  const [answer, setAnswer] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const onChangeAnswer = (e) =>{
    setValue(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const resultNum = firstNum * secondNum;
    if (parseInt(value) === resultNum){
      setAnswer(true);
      setValue('')
      setFirstNum(Math.ceil(Math.random() * 9));
      setSecondNum(Math.ceil(Math.random() * 9));
      inputRef.current.focus()
    }else{
      setAnswer(false);
      setValue('');
      inputRef.current.focus()
    }
  }
  
  
    return(
        <>
          <div>{firstNum} 곱하기 {secondNum}는? </div>
          <form onSubmit={onSubmit}>

            <input type="number" ref={inputRef} value={value} onChange={onChangeAnswer} />
            <button type="submit"></button>
            {answer ? <div>정답입니다.</div> : <div>틀렸습니다! 다시 입력해주세요</div>}
          </form>
        </>
    )
}

export default GuGuDan;