import React, {useState, useCallback, useContext, memo} from 'react';
import {TableContext} from "../../pages/MineSweeper";
const Form = memo( () => {
  const [row, setRow] = useState(5);
  const [col, setCol] = useState(5);
  const [mine, setMine] = useState(5);
  const {dispatch} = useContext(TableContext);

  const onChangeRow = useCallback((e) => {
    setRow(e.target.value)
    },[]
  );

  const onChangeCol = useCallback((e) => {
    setCol(e.target.value)
  },[])

  const onChangeMine = useCallback((e) => {
    setMine(e.target.value)
  },[])

  const onClickExecution = useCallback(() =>{
    dispatch({type:'START_GAME', row, col, mine})
  
  },[row, col, mine])

  return (
    <div>
      <input type="number" id="horizontal" placeholder="가로" value={row} onChange={onChangeRow} />
      <input type="number" id="vertical" placeholder="세로" value={col} onChange={onChangeCol} />
      <input type="number" id="mine" placeholder="지뢰" value={mine} onChange={onChangeMine} />
      <button type="button" id="exec" onClick={onClickExecution}>실행</button>      
    </div>
  );
})


export default Form;