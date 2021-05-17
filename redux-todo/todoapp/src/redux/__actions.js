export const ADD_TODO = "ADD_TODO";

export function addTodo(todo){
  return {
    type:ADD_TODO,
    payload:todo
  }
}

export const DELETE_TODO = "DELETE_TODO";

export function deleteTodo(todoId) {
  console.log('action todoId', todoId)
  return {
    type: DELETE_TODO,
    payload: todoId
  }
}

export const UPDATE_TODO = "UPDATE_TODO";

export function updateTodo(todo) {
  return {
    type: UPDATE_TODO,
    payload: todo
  }
}

export const TOGGLE_COMPLETE = "TOGGLE_COMPLETE";

export function toggleComplete(todo) {
  return {
    type: TOGGLE_COMPLETE,
    payload: todo
  }
}