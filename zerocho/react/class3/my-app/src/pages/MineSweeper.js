import React, {  useReducer,  createContext,  useMemo, useEffect} from 'react'
import Form from '../tutorial/mineSweeper/Form'
import Table from '../tutorial/mineSweeper/Table'

export const CODE = {
  MINE: -7,
  NORMAL: -1,
  QUESTION: -2,
  FLAG: -3,
  QUESTION_MINE: -4,
  FLAG_MINE: -5,
  CLICKED_MINE: -6,
  OPENED: 0
}
//초기값 
export const TableContext = createContext({
  tableData: [],
  halted: true,
  dispatch: () => {},
});

const initialState = {
  tableData: [],
  data: {
    row:0,
    col:0,
    mine:0,
  },
  timer: 0,
  result: '',
  halted: true,
  openedCells : 0,
  firstClick : false
};

//클릭시 테이블 , 지뢰 만들기
const plantMine = (row, col, mine) => {
  var candidateNumber = Array(row * col)
    .fill()
    .map(function (el, i) {
      return i
    })

  var shuffleNumber = [];
  while (((row * col) - mine) < candidateNumber.length) {
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
    let srow = Math.floor(shuffleNumber[k] / col)
    let scol = shuffleNumber[k] % col
    data[srow][scol] = CODE.MINE
  }

  return data
}


export const START_GAME = 'START_GAME'
export const OPEN_CELL = 'OPEN_CELL'
export const CLICK_MINE = 'CLICK_MINE'
export const FLAG_CELL = 'FLAG_CELL'
export const QUESTION_CELL = 'QUESTION_CELL'
export const NORMAL_CELL = 'NORMAL_CELL'
export const INCREMENT_TIMER = 'INCREMENT_TIMER'

const reducer = (state, action) => {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        data: {
          row:action.row,
          col:action.col,
          mine:action.mine         
        },
        openedCells : 0,
        halted: false,
        result:'',
        timer: 0,
        firstClick : false,
        tableData: plantMine(action.row, action.col, action.mine)
    }
    case OPEN_CELL: {
      const tableData = [...state.tableData]
      tableData[action.row] = [...state.tableData[action.row]]
      tableData[action.row][action.col] = CODE.OPENED //오픈 0 으로 바꿈 
      console.log('tableData :>> ', tableData[action.row][action.col]);
      const firstTimer = 1
      
      //console.log('[...state.tableData[action.row][action.col]]:>> ', ...state.tableData[action.row][action.col]);

      //모든가로들을 복사한다. 불변성때문에. 
      //[-1,-1,-1,-1,-7]
      console.log('1 tableData[action.row][action.col]', tableData[action.row][action.col])
      tableData.forEach((row, i) => {
        tableData[i] = [...state.tableData[i]]
      })
    

      const checked = [] //열린칸 배열
      let countCells = 0 //열린칸 수
      // 현재 cell의 주위cells 체크
      const checkAroundCells = (row, col) => {
        //주위 칸 체크이기때문에 CODE.NORMAL 유지 
        console.log('2 tableData[action.row][action.col]', tableData[row][col])
        console.log('tableData[row][col]===CODE.NORMAL', tableData[row][col]===CODE.NORMAL)
        //열려있거나, 깃발지뢰, 깃발, 물음표지뢰, 물음표가 포함된경우 (오른쪽클릭이 먼저 선택된경우 왼쪽클릭 실행안됨)
        if ([CODE.OPENED, CODE.FLAG_MINE, CODE.FLAG, CODE.QUESTION, CODE.QUESTION_MINE].includes(tableData[row][col])) {
          return;
        }

        //상하좌우 위줄 아래줄 왼쪽칸 오른쪽칸 없는경우 
        if (row < 0 || row >= tableData.length || col < 0 || col >= tableData[0].length) {
          return;
        }
        //오픈한 칸인 경우
        if (checked.includes(row + ',' + col)) {
          return;
        } else {
          checked.push(row + ',' + col) //오픈하지 않은경우 checked 배열에 담음
        }
       
        if(tableData[row][col]===CODE.NORMAL){ // 닫힌칸일 경우 
          countCells = countCells + 1 //열린칸 수 
        }
       

        let aroundCells = [] //주위 칸 배열 만들기
        //upper row
        if (tableData[row - 1]) {
          aroundCells = aroundCells.concat(
            [
              tableData[row - 1][col - 1],
              tableData[row - 1][col],
              tableData[row - 1][col + 1]
            ]
          )
        }
        //current cell left, right  
        aroundCells = aroundCells.concat(
          [tableData[row][col - 1], tableData[row][col + 1]]

        )

        //lower row
        if (tableData[row + 1]) {
          aroundCells = aroundCells.concat(
            [
              tableData[row + 1][col - 1],
              tableData[row + 1][col],
              tableData[row + 1][col + 1]
            ]
          )
        }
        
        const countMines = aroundCells.filter((v) => [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v)).length //주위 8칸의 지뢰갯수
        console.log('countMines :>> ', countMines);
        tableData[row][col] = countMines

        //주위 8칸 지뢰가 0이면, 지뢰가 없는경우
        if (countMines === 0) {
          const near = []
          //console.log('row', row)
          //console.log('col', col)

          if (row - 1 > -1) { //윗칸이 존재하면
            near.push([row - 1, col - 1])
            near.push([row - 1, col])
            near.push([row - 1, col + 1])
          }

          //left, right side
          near.push([row, col - 1])
          near.push([row, col + 1])

          //아래칸        
          if (row + 1 < tableData.length) {
            near.push([row + 1, col - 1])
            near.push([row + 1, col])
            near.push([row + 1, col + 1])
          }

          //0 주위 8칸 다시 체크 
          near.forEach((n) => {

            if (tableData[n[0]][n[1]] !== CODE.OPENED) { //오픈되지 않은칸만 체크          
              checkAroundCells(n[0], n[1])
            }
          })
        } else {

        }
      }

      //console.log('tableData', tableData)
      checkAroundCells(action.row, action.col)
      console.log('state', state)
      let firstClick = true
      let halted = false
      let result=''
      
      console.log('state.data.row * state.data.col - state.data.mine', state.data.row * state.data.col - state.data.mine)
      console.log('state.openedCells', state.openedCells)
      console.log('countCells', countCells)
      console.log('state.openedCells + countCells', state.openedCells + countCells)
      
      if(state.data.row * state.data.col - state.data.mine === state.openedCells + countCells){
        halted = true // stop the game
        firstClick = false
        result='you WIN!'

      }
      return {
        ...state,
        tableData,
        openedCells: state.openedCells + countCells,
        halted,
        result,
        firstClick
      }
    }
    case CLICK_MINE: {
      const tableData = [...state.tableData]
      tableData[action.row] = [...state.tableData[action.row]]
      tableData[action.row][action.col] = CODE.CLICKED_MINE
      return {
        ...state,
        tableData,
        halted: true,
        firstClick: false
      }
    }
    case FLAG_CELL: {
      const tableData = [...state.tableData]
      console.log('tableData :>> ', tableData);
      tableData[action.row] = [...state.tableData[action.row]]
      if (tableData[action.row][action.col] === CODE.MINE) {
        tableData[action.row][action.col] = CODE.FLAG_MINE
      } else {
        tableData[action.row][action.col] = CODE.FLAG
      }
      return {
        ...state,
        tableData
      }
    }
    case QUESTION_CELL: {
      const tableData = [...state.tableData]
      tableData[action.row] = [...state.tableData[action.row]]
      if (tableData[action.row][action.col] === CODE.FLAG_MINE) {
        tableData[action.row][action.col] = CODE.QUESTION_MINE
      } else {
        tableData[action.row][action.col] = CODE.QUESTION
      }
      return {
        ...state,
        tableData
      }
    }
    case NORMAL_CELL: {
      const tableData = [...state.tableData]
      tableData[action.row] = [...state.tableData[action.row]]
      if (tableData[action.row][action.col] === CODE.QUESTION_MINE) {
        tableData[action.row][action.col] = CODE.MINE
      } else {
        tableData[action.row][action.col] = CODE.NORMAL
      }
      return {
        ...state,
        tableData
      }
    }
    case INCREMENT_TIMER:{
      return {
        ...state,
        timer:state.timer + 1
      }
    }
    default:
      return state;
  }
}


function MineSweeper() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const {tableData, halted, timer, result, firstClick} = state
  const value = useMemo(() => ({tableData, halted, dispatch}), [tableData, halted]);

  
  useEffect(() => {
    let timer
    if(firstClick === true){
      
      timer = setInterval(()=>{
        dispatch({type: INCREMENT_TIMER})
      },1000)
      return () => {
        clearInterval(timer)
      }
    }
  }, [firstClick])

  return (
    <TableContext.Provider value={value}>
      <Form  />     
        {firstClick ?<div id="timer">{timer + 1}초</div> :  <div>{timer}초</div>}
        {/* <div id="timer">{timer}초</div> */}
      <Table />
      <div class="result">{result}</div>
    </TableContext.Provider>
  );
}

export default MineSweeper;