import React, { useReducer, useState } from "react";

const initialState = {
  count: 0
};

const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";
const INITCOUNT = "INITCOUNT";

function reducer(state, action) {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        count: state.count + 1
      };
    case DECREMENT:
      return {
        ...state,
        count: state.count - 1
      };
    case INITCOUNT:
      return {
        ...state,
        count: action.payload
      };
    default:
      return state;
  }
}

function Counter() {
  const [value, setValue] = useState(0);
  const [state, dispatch] = useReducer(reducer, initialState);

  const onIncrease = () => {
    dispatch({ type: INCREMENT });
  };

  // function incrementAsync() {
  // return dispatch => { // dispatch 를 파라미터로 가지는 함수를 리턴합니다.
  //   setTimeout(() => {
  //     // 1 초뒤 dispatch 합니다
  //     dispatch(onIncrease());
  //   }, 1000);
  // };
}

  const onDecrease = () => {
    dispatch({ type: DECREMENT });
  };

  const onChangeValue = (e) => {
    setValue(e.target.value);
  };

  const onClickSetValue = () => {
    dispatch({ type: INITCOUNT, payload: value });
  };

  return (
    <div>
      <label>start count</label>
      <input type="number" onChange={onChangeValue} value={value} />
      <button onClick={onClickSetValue}>set Counte Number</button>
      <h1>value : {value}</h1>
      <h1>count: {state.count}</h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
    </div>
  );
}

export default Counter;
