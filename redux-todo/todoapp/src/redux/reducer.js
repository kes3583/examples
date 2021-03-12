
import { ADD_TODO, DELETE_TODO, UPDATE_TODO } from './actions';
import { todos } from './states';


const rootReducer = (state = todos, action) => {
  switch (action.type) {
    case ADD_TODO:
      return { 
        ...state,
        ...action.payload      
    }
    case DELETE_TODO:
      let newTodos = [...state];
      newTodos = newTodos.filter((todo) => (
        console.log('reducer todo.id :>> ', todo.id),
        console.log('reducer action.payload', action.payload),
        todo.id === action.payload // 클릭했을때 같지 않은 것들은 데이터에 다시 담는다. 즉 4를 클릭했을경우 todo.id 4와 action.payload 4가 같으면 삭제되고 나머지 같지않은 1,2,3은 데이터에 다시 담게된다. 
      ))
      return newTodos;
    case UPDATE_TODO:
      return { ...state, ...action.payload }

    default:
      return state
  }
}

export default rootReducer;
