import { initialState }  from './states'
import { CHANGE_NAME, IS_LOGIN} from './action'
import {HYDRATE} from 'next-redux-wrapper'

//(이전상태, 액션) => 다음상태
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      console.log(`HYDRATE`, action)
      return {...state, ...action.payload};
    case CHANGE_NAME:
      return { 
        ...state, 
        // name:action.payload.data
        name:action.data
      }
    case IS_LOGIN:
      return { 
        ...state, //copy initialState
        user:{
          ...state.user, // initialState > user copy
          isLoggedIn: !state.user.isLoggedIn, // 바꿀 데이터만 적기 
          user: action.data || null
      }
    // case LOG_OUT:
    //   return { 
    //     ...state, //copy initialState
    //     user:{
    //       ...state.user, // initialState > user copy
    //       isLoggedIn: false, // 바꿀 데이터만 적기 
    //       user: null
    //     }
    //   }

    default:
      return state
    }
}

export default rootReducer;
