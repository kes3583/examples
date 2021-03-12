import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteTodo } from '../redux/actions'

function TodoItem({ todo }) {
  const dispatch = useDispatch();
  
  return (
    <div>
      <div className="row mx-2 align-items-center">
        <div>#{todo.id}</div>
        <div className="col"><h4>{todo.text}</h4></div>
        <div className="col">{todo.isCompleted ? <h4>Done</h4> : <h4>Yet</h4>}</div>
        <button className="btn btn-primary m-2">Edit</button>
        <button className="btn btn-danger m-2" onClick={()=>dispatch(deleteTodo(todo.id))}>Delete</button>
      </div>
    </div>
  )
}

export default TodoItem
