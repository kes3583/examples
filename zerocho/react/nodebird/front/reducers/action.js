export const CHANGE_NAME = 'CHANGE_NAME'
export function changeName (data) {
  return{
    type:CHANGE_NAME,
    //payload:data
    data
  }
}
