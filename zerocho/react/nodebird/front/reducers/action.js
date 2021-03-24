export const CHANGE_NAME = 'CHANGE_NAME'
export function changeName (data) {
  return{
    type:CHANGE_NAME,
    //payload:data
    data
  }
}

export const LOG_IN = 'LOG_IN';
export function login () {
  return {
    type: LOG_IN,
    data
  }
}