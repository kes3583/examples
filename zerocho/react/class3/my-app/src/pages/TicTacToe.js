import React, { useEffect, useReducer} from "react";
import Table from "../tutorial/Table";

const initialState = {
  winner: '',
  currentPlayer: 'o',
  tableData: [['','',''],['','',''],['','','']],
  targetTd:[-1, 1] //처음 초기화, 
}

export const SET_WINNER = 'SET_WINNER'
export const CLICK_CELL = 'CLICK_CELL'
export const CHANGE_PLAYER = 'CHANGE_PLAYER'
export const RESET_GAME = 'RESET_GAME'

const reducer = (state, action) => {
  // eslint-disable-next-line default-case
  switch(action.type){
    case SET_WINNER:
      //state.winner = action.winner; 직접 바꾸면 아니됨
      return {
        ...state, //state를 spread를 복사를 하고
        winner: action.winner, //바뀌는 부분만 바꿔준다. 
      }
    case CLICK_CELL:
      const tableData = [...state.tableData] // 불변성을 위해서 복사해준다. tableData 껍데기만 복사하기에 아래 row도 다시 복사해준다. 
      tableData[action.targetRow] = [...tableData[action.targetRow]] //복사해준다. immer라이브러리 가독성해결
      tableData[action.targetRow][action.targetCell] = state.currentPlayer
      console.log('state.currentPlayer :>> ', state.currentPlayer);
      console.log('tableData :>> ', tableData);
      
      return {
        ...state,
        tableData, 
        targetTd: [action.targetRow, action.targetCell], // click한 타겟 td 저장하기 
      }
    case CHANGE_PLAYER:      
      return{
        ...state,
        currentPlayer: state.currentPlayer === 'o' ? 'x': 'o'
      }
    case RESET_GAME:
      return{
        ...state,
        currentPlayer: 'o',
        tableData: [['','',''],['','',''],['','','']],
       
      }
  }
}

console.log("outer render");
function TicTacToe() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {tableData, currentPlayer, winner, targetTd} = state;
  // const [winner, setWinner] = useState('');
  // const [turn, setTurn] = useState('o');
  // const [tableData, setTableData] = useState([['','',''],['','',''],['','','']]);
  let bingo;
   useEffect(() => {
     const [targetRow, targetCell] = targetTd;
      console.log('click render');
     if(targetRow < 0) {
       return;
     }
     console.log('targetRow, targetCell :>> ', targetRow, targetCell);
     console.log('currentPlayer :>> ', currentPlayer);
    //horizentolly
    if (tableData[targetRow][0] === currentPlayer &&
        tableData[targetRow][1] === currentPlayer && 
        tableData[targetRow][2] === currentPlayer){
        bingo = true;
        console.log('bingo1', bingo)
    }

    //vertically
    if (tableData[0][targetCell]=== currentPlayer &&
        tableData[1][targetCell]=== currentPlayer &&
        tableData[2][targetCell]=== currentPlayer) {
        bingo = true;
        console.log('bingo2', bingo)
    }

    //diagnolly left
    if ((tableData[0][0]=== currentPlayer && tableData[1][1]=== currentPlayer && tableData[2][2]=== currentPlayer) || 
        (tableData[0][2]=== currentPlayer && tableData[1][1]=== currentPlayer && tableData[2][0]=== currentPlayer)) {
        bingo = true;
        console.log('bingo3', bingo)
    }
    if(bingo){
      dispatch({type: SET_WINNER, winner:currentPlayer})
      dispatch({type:RESET_GAME})
    }else{
      let all = true; // 칸이 다 차 있음은 무승부를 의미 
      //무승부 검사
      tableData.forEach((row) => {   
          row.forEach((cell) => {
              if(!cell) {
                all = false
              }
          });
      });  

      if(all){ // 무승부일경우 
        dispatch({type:RESET_GAME})
        dispatch({type: SET_WINNER, winner:'tie'})
        
      }else{
        dispatch({type:CHANGE_PLAYER})
      }
      
    }
        
     return () => {
       
     };
   }, [targetTd]);
  return (
    <>
      {console.log('render')}
      {console.log('state.tableData', tableData)}
      <Table tableData={tableData} dispatch={dispatch}/> 
      {winner === 'tie' ? <div>무승부!</div> :  <div>{winner}님의 승리</div>}    
    </>
  );
}

export default TicTacToe;
