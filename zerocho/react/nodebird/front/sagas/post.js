import axios from 'axios';
import {
  all, fork, takeLatest, put, delay,
} from 'redux-saga/effects';
import {
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
} from '../reducers/post';

// 포스트 등록
// function addPostAPI() {
//   return axios.post('/api/post/:id');
// }

// eslint-disable-next-line no-unused-vars
function* addPost(action) {
  // const result = yield call(addPostAPI, action.data);
  yield delay(1000);
  try {
    yield put({
      type: ADD_POST_SUCCESS,
      // data: result.data,
    });
  } catch (err) {
    yield put({
      type: ADD_POST_FAILURE,
      error: err.result.data,
    });
  }
}

// 코멘트 등록
function addCommentAPI(data) {
  return axios.post(`/api/post/${data.postId}/comment`, data);
}

function* addComment(action) {
  // const result = yield call(addCommentAPI, action.data);
  yield delay(1000);
  try {
    yield put({
      type: ADD_COMMENT_SUCCESS,
      // data: result.data,
    });
  } catch (err) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: err.result.data,
    });
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
  yield all([fork(watchAddPost), fork(watchAddComment)]);
}
