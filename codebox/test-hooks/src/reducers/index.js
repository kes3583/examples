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