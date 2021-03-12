const initialState = {
  name: 'cherry',
  age:2,
  password:1234
}

const changeName = (data) => {
  return {
    type:'CHANGE_NAME',
    data
  }
}

changeName('lovelycherry')

//(이전상태, )
export default (state = initialState, action) => {
  switch (action.type) {

  case 'CHANGE_NAME':
    return { 
      ...state, 
      name:action.name
    }

  default:
    return state
  }
}
