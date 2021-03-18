
import { ADD_TODO, DELETE_TODO, UPDATE_TODO } from './actions';
import { initialState } from './states';

const rootReducer = (state = initialState, action) => {

  switch (action.type) {
    case ADD_TODO:
      return{
        ...state,
        todos:state.todos.concat({
          id: action.payload.id,
          text:action.payload.text,
          isCompleted:false,
        })
      } 
    case DELETE_TODO:
      return { 
        ...state, 
        todos: state.todos.filter( (todo) => (
          console.log('reducer todo.id :>> ', todo.id),
          console.log('reducer action.payload:>> ', action.payload),
          console.log('todo.id !== action.payload', todo.id !== action.payload),
          todo.id !== action.payload //id가 같지 않은건 false값이 되는건 
          // 4와 같지 않은 나머지 true 된 값 3개의 오브젝트를 반환 
        )
      )
    }
    case UPDATE_TODO:
      const newTodos = [...state]
      console.log('action.payload :>> ', action.payload);
      return newTodos;

    default:
      return {...state}
    
  }
}

export default rootReducer;