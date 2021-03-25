export const CHANGE_NAME = 'CHANGE_NAME'
export function changeName (data) {
  return{
    type:CHANGE_NAME,
    //payload:data
    data
  }
}

export const IS_LOGIN = 'IS_LOGIN';
export function loginAction (data) {
  return {
    type: IS_LOGIN,
    data
  }
}

// export const LOG_OUT = 'LOG_OUT';
// export function logoutAction () {
//   return {
//     type: LOG_OUT
//   }
// }