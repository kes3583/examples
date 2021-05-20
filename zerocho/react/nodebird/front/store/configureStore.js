import { createWrapper } from 'next-redux-wrapper';
import { createStore, compose, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

import reducer from '../reducers/index';



const loggerMiddleware = ({ dispatch, getState }) => next => action => {
  //action은 객체이나 thunk에서 함수로 둘수있다.

  console.log(action); //액션실행전 콘솔 찍기
  // if (typeof action === 'function') {
  //   return action(dispatch, getState);
  // }

  return next(action); //action 실행
};

const configureStore = () => {
  const middleware = [thunkMiddleware, loggerMiddleware];
  const enhancer =
    process.env.NODE_ENV === 'production'
      ? compose(applyMiddleware(...middleware))
      : composeWithDevTools(applyMiddleware(...middleware));
  const store = createStore(reducer, enhancer);
  return store;
};
const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === 'development',
});

export default wrapper;
