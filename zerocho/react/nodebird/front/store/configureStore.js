import { createWrapper } from 'next-redux-wrapper';
import { createStore, compose, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import reducers from '../reducers';
import rootSaga from '../sagas';

// eslint-disable-next-line no-unused-vars
const loggerMiddleware = ({ dispatch, getState }) => (next) => (action) => {
  // action은 객체이나 thunk에서 함수로 둘수있다.

  console.log(action); // 액션실행전 콘솔 찍기
  // if (typeof action === 'function') {
  //   return action(dispatch, getState);
  // }

  return next(action); // action 실행
};

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [sagaMiddleware, loggerMiddleware];
  const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middleware))
    : composeWithDevTools(applyMiddleware(...middleware));
  const store = createStore(reducers, enhancer);
  console.log('store :>> ', store);
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};
const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === 'development',
});

export default wrapper;
