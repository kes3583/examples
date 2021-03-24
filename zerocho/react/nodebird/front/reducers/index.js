import initialState from './states'
import { CHANGE_NAME, LOG_IN } from './action'

//(이전상태, 액션) => 다음상태
export default (state = initialState, action) => {
  switch (action.type) {

  case CHANGE_NAME:
    return { 
      ...state, 
      // name:action.payload.data
      name:action.data
    }
  case LOG_IN:
    return { 
      ...state, 
      // name:action.payload.data
      name:action.data
    }

  default:
    return state
  }
}
