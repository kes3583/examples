import React, {memo}  from "react";
import Td from "./Td";

console.log("outer render TR");
const Tr = memo( ({rowIndex, rowData, dispatch}) =>  {
  
  return (
    <>      
       <tr>
        {Array(rowData.length).fill().map((td, i) => (
          <Td key={i} rowIndex={rowIndex} cellIndex={i} cellData={rowData[i]} dispatch={dispatch}/>  
        ))  
        }
       </tr>      
    </>
  );
})

export default Tr;
