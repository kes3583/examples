import React, {memo, useContext} from 'react';
import Tr from './Tr'
import { TableContext } from "../../pages/MineSweeper";

const Table = memo(() => {
  const {tableData } = useContext(TableContext);
  return (
    <div>
      <table>
        <thead></thead>
        <tbody>
          {tableData[0] && Array(tableData[0].length).fill().map( (tr,i) => (
            <Tr key={i} rowIndex={i} /> 
            ))
          }
        </tbody>
        <tfoot></tfoot>
      </table>
    </div>
  );
})

export default Table;