import React, {useReducer, createContext, useMemo} from 'react';
import Form from '../tutorial/mineSweeper/Form'
import Table from '../tutorial/mineSweeper/Table'

export const CODE = {
  MINE : -7,
  NORMAL : -1,
  QUESTION: -2,
  FLAG: -3, 
  QUESTION_MINE: -4,
  FLAG_MINE: -5,
  CLICKED_MINE: -6,
  OPENED:0
}
//초기값 
export const TableContext = createContext({
  tableData: [],
  halted:true,
  dispatch: () => {},
});

const initialState = {
  tableData:[],
  timer:0,
  result:'',
  halted:true
};

//클릭시 테이블 , 지뢰 만들기
const plantMine = (row,col,mine) => {
  
  console.log('row,col,mine', row,col,mine);
  var candidateNumber = Array(row * col) 
  .fill()
  .map(function(el, i){
      return i  
  }) 
  
  var shuffleNumber = [];
  while (((row * col)-mine) < candidateNumber.length) { 
    let val = candidateNumber.splice(Math.floor(Math.random() * candidateNumber.length), 1)[0]
    shuffleNumber.push(val)    
  }

  //테이블 만들기
  //데이터 구조 
  //[
  //    [-1,-1,-1,-1,-7],
  //    [-1,-7,-1,-1,-1],   
  //]
  const data = []
  for (let i = 0; i < row; i++) {    
    var rowData = []
    data.push(rowData)
    for (let j = 0; j < col; j++) {
      rowData.push(CODE.NORMAL)
    }
  }

  // 지뢰 심기 
  for (let k = 0; k < shuffleNumber.length; k++) {
    let srow = Math.floor(shuffleNumber[k] / col )
    let scol = shuffleNumber[k] % col 
    data[srow][scol]  = CODE.MINE
  }

  console.log('shuffleNumber :>> ', shuffleNumber); 
  console.log('data :>> ', data);
  return data
}


export const START_GAME = 'START_GAME'
export const OPEN_CELL = 'OPEN_CELL'
export const CLICK_MINE = 'CLICK_MINE'
export const FLAG_CELL = 'FLAG_CELL'
export const QUESTION_CELL = 'QUESTION_CELL'
export const NORMAL_CELL = 'NORMAL_CELL'



const reducer = (state, action) => {
  switch (action.type) {

  case START_GAME:
    return { 
      ...state, 
      halted:false,
      tableData: plantMine(action.row, action.col, action.mine)
    }
  case OPEN_CELL:{
    const tableData = [...state.tableData]
    tableData[action.row] = [...state.tableData[action.row]]
    tableData[action.row][action.col] = CODE.OPENED
    console.log('tableData :>> ', tableData[action.row][action.col]);
    console.log('...state.tableData :>> ', tableData[action.row][action.col]);
    //console.log('[...state.tableData[action.row][action.col]]:>> ', ...state.tableData[action.row][action.col]);

    //모든가로들을 복사한다. 불변성때문에. 
    //[-1,-1,-1,-1,-7]
    tableData.forEach((row,i)=>{
      tableData[i] = [...state.tableData[i]]
    })
    
    //0
    const checkAroundCells = (row, col) => {
      if([CODE.OPENED, CODE.FLAG_MINE, CODE.FLAG, CODE.QUESTION_MINE, CODE.QUESTION].includes(tableData[row][col])){
        return;
      }
      if(row<0 || row > tableData.length || col < 0 || col > tableData[0].length){
        return;
      }


      let aroundCells = []
      //upper row
      if (tableData[action.row-1]) {
        aroundCells = aroundCells.concat(
          [
            tableData[action.row-1][action.col-1],
            tableData[action.row-1][action.col],
            tableData[action.row-1][action.col+1]  
          ]
        )   
      }  
      //current cell left, right  
      aroundCells = aroundCells.concat(
        [ tableData[action.row][action.col-1], tableData[action.row][action.col+1] ]

      ) 

      //lower row
      if (tableData[action.row+1]) {
      aroundCells = aroundCells.concat(
          [
            tableData[action.row+1][action.col-1],
            tableData[action.row+1][action.col],
            tableData[action.row+1][action.col+1]  
          ]
        )   
      }
      console.log('aroundCells :>> ', aroundCells);
      const countMines = aroundCells.filter((v) => [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v)).length
      console.log('countMines :>> ', countMines);
      tableData[action.row][action.col] = countMines
     
      if (countMines === 0) {
       const near = []
       console.log('row', row)
       console.log('col', col)

       if(row -1 > -1){ //윗칸이 존재하면
         near.push([row -1, col -1])
         near.push([row -1, col])
         near.push([row -1, col +1])
       }

       //left, right side
       near.push([row, col - 1])
       near.push([row, col + 1])

       //아래칸
       console.log('tableData.length', tableData.length)
       if(row + 1 < tableData.length){
         near.push([row +1, col -1])
         near.push([row +1, col])
         near.push([row +1, col +1])
       }
       console.log('near[]', near)
       near.forEach((n)=>{
        //checkAroundCells(n[0], n[1])
       })
      }else{
        
      }
    }

    //0이 아닐경우 
    checkAroundCells(action.row, action.col)
    console.log('tableData row :>> ', tableData);


    return {
      ...state, 
      tableData
    }
  }
  case CLICK_MINE:{
    const tableData = [...state.tableData]
    tableData[action.row] = [...state.tableData[action.row]]
    tableData[action.row][action.col] = CODE.CLICKED_MINE
    return {
      ...state,
      tableData,
      halted: true
    }
  }
  case FLAG_CELL:{
    const tableData = [...state.tableData]
    console.log('tableData :>> ', tableData);
    tableData[action.row] = [...state.tableData[action.row]]
    if(tableData[action.row][action.col] === CODE.MINE){
      tableData[action.row][action.col] = CODE.FLAG_MINE
    }else{
      tableData[action.row][action.col] = CODE.FLAG
    }
    return {
      ...state,
      tableData
    }
  }
  case QUESTION_CELL:{
    const tableData = [...state.tableData]
    tableData[action.row] = [...state.tableData[action.row]]
    if(tableData[action.row][action.col] === CODE.FLAG_MINE){
      tableData[action.row][action.col] = CODE.QUESTION_MINE
    }else{
      tableData[action.row][action.col] = CODE.QUESTION
    }
    return {
      ...state,
      tableData
    }
  }
  case NORMAL_CELL:{
    const tableData = [...state.tableData]
    tableData[action.row] = [...state.tableData[action.row]]
    if(tableData[action.row][action.col] === CODE.QUESTION_MINE){
      tableData[action.row][action.col] = CODE.MINE
    }else{
      tableData[action.row][action.col] = CODE.NORMAL
    }
    return {
      ...state,
      tableData
    }
  }
  default:
    return state;
  }
}


function MineSweeper() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const {tableData, halted, timer, result} = state
  const value = useMemo(() => ({tableData, halted, dispatch}), [tableData, halted]);

  return (
    <TableContext.Provider value={value}>
      <Form  />
      <div id="timer">{timer}초</div>
      <Table />
      <div class="result">{result}</div>
    </TableContext.Provider>
  );
}

export default MineSweeper;