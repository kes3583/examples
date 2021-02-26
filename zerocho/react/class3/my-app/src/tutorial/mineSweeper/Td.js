import React, {memo, useContext, useCallback, useMemo}  from "react";
import { CODE, OPEN_CELL, CLICK_MINE, FLAG_CELL, QUESTION_CELL, NORMAL_CELL, TableContext } from "../../pages/MineSweeper";

const getTdStyle = (code) =>{
  switch(code) {
    case CODE.NORMAL:
    case CODE.MINE:
      return {
        background: '#444'
      }
    case CODE.OPENED:
      return {
        background: '#fff'
      }
    case CODE.FLAG:
    case CODE.FLAG_MINE:
      return {
        background:'red'
      }
    case CODE.QUESTION:
    case CODE.QUESTION_MINE:
      return {
        background:'yellow'
      }
    default:
      return {
        background: '#fff'
      }
  }
}

const getTdText = (code) => {
  switch(code) {
    case CODE.NORMAL:
      return ''
    case CODE.MINE:
      return 'X'
    case CODE.CLICKED_MINE:
      return '펑!'
    case CODE.FLAG_MINE:
    case CODE.FLAG:
      return '!'
    case CODE.QUESTION:
    case CODE.QUESTION_MINE:
      return '?'
    default:
      return code || ''
  }
}


const Td = memo( ({rowIndex, colIndex}) =>  {
  const {tableData, dispatch, halted} = useContext(TableContext)
  
  const onClickTd = useCallback(() =>{
    if(halted) {
      return;
    }
    
    console.log('tableData[rowIndex][colIndex] :>> ', tableData[rowIndex][colIndex]);
    switch (tableData[rowIndex][colIndex]) {
      case CODE.NORMAL:
        console.log('opened');
        //console.log('tableData[rowIndex][colIndex]) :>> ', tableData[rowIndex][colIndex]);
        dispatch({type:OPEN_CELL, row:rowIndex, col:colIndex})  
        return;
      case CODE.MINE: 
        dispatch({type:CLICK_MINE, row:rowIndex, col:colIndex})
        return;
      case CODE.OPENED:         
      case CODE.FLAG_MINE:
      case CODE.FLAG:
        return;        
      case CODE.QUESTION:
      case CODE.QUESTION_MINE: 
        //dispatch({type:OPEN_CELL, row:rowIndex, col:colIndex})
        return;
      default:
        return;
    }
  },[tableData[rowIndex][colIndex], halted]) 

  // 오른쪽 클릭 
  const onRightClickTd = useCallback(
    (e) => {
      e.preventDefault();
      if(halted) {
        return;
      }
      console.log('rowIndex, colIndex :>> ', rowIndex, colIndex);
      
      switch (tableData[rowIndex][colIndex]) {
        case CODE.NORMAL:
        case CODE.MINE:
          dispatch({type:FLAG_CELL, row:rowIndex, col:colIndex })          
          return;
        case CODE.FLAG_MINE: //if flag, set a queston mark 
        case CODE.FLAG:
          dispatch({type:QUESTION_CELL, row:rowIndex, col:colIndex})
          return;
        case CODE.QUESTION:
        case CODE.QUESTION_MINE:
          dispatch({type:NORMAL_CELL, row:rowIndex, col:colIndex})
          return;
        default:
          return;
      }
    },[tableData[rowIndex][colIndex], halted]);

  console.log('td rendering')
  return useMemo( () => (
    <td onClick={onClickTd} onContextMenu={onRightClickTd} style={getTdStyle(tableData[rowIndex][colIndex])}>{getTdText(tableData[rowIndex][colIndex])}</td>
    ),[tableData[rowIndex][colIndex], halted])
})

export default Td;