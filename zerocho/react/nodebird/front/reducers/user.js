//state
export const initialState = {
  isLoggedIn: false,
  user: null,
  signUpData: {},
  loginData: {}
}
//action
export const IS_LOGIN = 'IS_LOGIN';
export function loginAction(data) {
  return {
    type: IS_LOGIN,
    data
  }
}

//reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_LOGIN:
      return { 
        ...state, //copy initialState
          isLoggedIn: !state.isLoggedIn, // 바꿀 데이터만 적기 
          user: action.data || null
        }
      
    default:
      return state;
  }
}


export default reducer;