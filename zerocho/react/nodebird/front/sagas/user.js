// import axios from 'axios';
import {
  all,
  fork,
  take,
  takeEvery,
  put,
  delay,
} from 'redux-saga/effects';
// fork, call - 함수 실행
// put - dispatch와 같음
// all

// 이벤트 리스너 같은 느낌. 로그인 요청이 들어오면.
// take 는 일회용 그래서  while 로 감싼다. 동기
// takeEvery - 비동기 while 대체, 클릭한 갯수만큼 실행
// takeLatest - 마지막 클릭한 것만 실행 실수로 두번클릭 방지하기 위한 보통으로 쓰임. 동시에 로딩되는 것중 마지막것만 요청을 보냄
// 그럼 응답도 두번 보내진다. 포스트도 클릭한 수만큼 요청이 가서 데이터에 저장이 되면 응답이 올때 취소가 된다.
// 그래서 마지막 응답만 받는다. 프론트에서는 요청취소는 못한다. 서버쪽에서 중복 요청보낸것은 취소 시켜야 한다.
// throttle ('', addPost , 2000) 2초안에는 요청을 못하게 만든다. 많은 요청( 디도스 공격)은 throttle로 프론트에서 요청이 안가게 한다.
// debounce

import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
} from '../reducers/user';

// 로그인
// function logInAPI() {
//   return axios.post('/api/login');
// }

function* logIn(action) {
  try {
    console.log('saga login :>> ', action);
    // const result = yield call(logInAPI, action.data);
    yield delay(1000);
    // fork는 비동기로서, api요청보내고 바로 다음 라인 실행, axkos.post(url) yield...
    // call은 동기함수로 요청 기다리고 리턴하는 데이터를 받은 다음, 다음 라인 실행, axios.post(url).then(()=>{response.data})
    // 여기에서 yield가 await가 같은 역할을 한다.

    yield put({
      // action 호출하므로 reducer에서 만들어줄 필요가 없음.
      type: LOG_IN_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.data,
    });
  }
}

// 로그아웃
// function logOutAPI() {
//   return axios.post('/api/logout');
// }

function* logOut() {
  try {
    // const result = yield call(logOutAPI);
    yield delay(1000);
    yield put({
      type: LOG_OUT_SUCCESS,
      // data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOG_OUT_FAILURE,
      error: err.result.data,
    });
  }
}

// 로그아웃
// function signUpAPI() {
//   return axios.post('/api/signup');
// }

function* signUp() {
  try {
    // const result = yield call(signUpAPI);
    yield delay(1000);
    // throw new Error('') 이렇게 처리하면 바로 catch 문구로 간다. 
    yield put({
      type: SIGN_UP_SUCCESS,
      // data: result.data,
    });
  } catch (err) {
    yield put({
      type: SIGN_UP_FAILURE,
      error: err.result.data,
    });
  }
}

function* watchLogIn() {
  while (true) {
    yield take(LOG_IN_REQUEST, logIn);
  }
}

function* watchLogOut() {
  yield takeEvery(LOG_OUT_REQUEST, logOut);
}

function* watchSignUp() {
  yield takeEvery(SIGN_UP_REQUEST, signUp);
}

export default function* userSaga() {
  yield all([fork(watchLogIn), fork(watchLogOut), fork(watchSignUp)]);
}
