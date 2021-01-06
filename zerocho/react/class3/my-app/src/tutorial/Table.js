import React from "react";
import Tr from "./Tr";

console.log("outer render Table");
function Table({onClick, tableData, dispatch}) {
  
  return (
    <>      
       <table onClick={onClick}>
         <thead></thead>
         <tbody>
           {Array(tableData.length).fill().map((tr, i)=> (<Tr key={i} rowIndex={i} rowData={tableData[i]} dispatch={dispatch} />))}
          
         </tbody>
          <tfoot></tfoot>      
       </table>      
    </>
  );
}

export default Table;
