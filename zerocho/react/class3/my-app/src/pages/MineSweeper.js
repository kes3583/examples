import React, {useReducer} from 'react';

const initialState = {
  tableData:[]
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {

  case typeName:
    return { ...state, ...payload }

  default:
    return state;
  }
}

function MineSweeper() {
  const [state, dispatcher] = useReducer(reducer, initialState)
  return (
    <div>
      
    </div>
  );
}

export default MineSweeper;