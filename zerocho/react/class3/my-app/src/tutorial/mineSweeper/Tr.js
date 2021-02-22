import React, {memo, useContext}  from "react";
import { TableContext } from "../../pages/MineSweeper";
import Td from "./Td";

const Tr = memo( ({rowIndex}) =>  {
  const {tableData}= useContext(TableContext)
  return (
    <tr>
      {tableData[0] && Array(tableData[0].length).fill().map( (td,i) => (
        <Td key={i}  rowIndex={rowIndex} colIndex={i}/> 
      )       
      )}
    </tr>      
  );
})

export default Tr;