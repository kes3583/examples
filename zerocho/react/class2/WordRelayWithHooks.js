import React, { useState, useRef, useEffect } from 'react';

function WordRelay(props) { 

  const text = 'WordRelay';
  const [word, setWord] = useState('체리');
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const InputRef = useRef(null);
  
  
  // Update the document title using the browser API
  function onChangeInput(e){
    setValue(e.currentTarget.value)
  }

  function onSubmitForm(e) {
    e.preventDefault();
    if (word[word.length -1] === value[0]) {
      setResult('딩동댕')
      setWord(value)
      setValue('')
      InputRef.current.focus();
    }else{
      setResult('땡!')
      setValue('')
      InputRef.current.focus();
    }
    
  }

  return (
    <>
      <h1>{text}</h1>
      <h2>{props.name}</h2>
      <div>{word}</div>
      <form onSubmit={onSubmitForm}>
        <input type="text" ref={InputRef} value={value} onChange={onChangeInput} />
        <button>입력</button>       
      </form>
      <div>{result} </div>
    </>
  )
    
}
export { WordRelay }
