import React, {useState, useCallback, useContext} from 'react';
import {TableContext} from "../../pages/MineSweeper";
function Form() {
  const [row, setRow] = useState(10);
  const [col, setCol] = useState(10);
  const [mine, setMine] = useState(20);
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
}

export default Form;