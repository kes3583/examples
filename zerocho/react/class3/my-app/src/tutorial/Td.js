import React, {memo, useCallback} from "react";
import {CLICK_CELL, CHANGE_PLAYER} from './../pages/TicTacToe'

console.log("outer render TD");
const Td = memo( ({rowIndex, cellIndex, dispatch, cellData}) =>  {

  const onClickTd = useCallback(
    () => {
      if(cellData) return;

      
      dispatch({type:CLICK_CELL, targetRow: rowIndex, targetCell: cellIndex})
      
      console.log('rowIndex, cellIndex, cellData :>> ', rowIndex, cellIndex, cellData);
    },
    [cellData],
  );

  return (
    <>   
      <td onClick={onClickTd}>{cellData}</td>
    </>
  );
})

export default Td;
