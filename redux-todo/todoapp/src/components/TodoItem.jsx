import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateTodo, deleteTodo, toggleComplete } from '../redux/todoSlice'

function TodoItem({ todo }) {
  const [editable, setEditable] = useState(false);
   const [todoText, setTodoText] = useState(todo.text)
  const dispatch = useDispatch();
  
  function onChangeTodoText(e) {
    setTodoText(e.target.value)
  }

  const onDeleteTodo = () => {
    dispatch(deleteTodo({id: todo.id}));
  }
  const onToggle = () =>{
    dispatch(toggleComplete({id:todo.id, isCompleted: !todo.isCompleted}))
  }

  const onEditable = () =>{
    setEditable(true)
  }

  const onUpdateTodo = () => {
    dispatch(updateTodo(
      {
        id:todo.id,
        text:todoText,

      }
    ));
    setEditable(false)
  }

  return (
    <div>
      <div className="row mx-2 align-items-center">
        <div>#{todo && todo.id}</div>
        <div className="col" onClick={onEditable}>
          {editable ? <input type="text" className="col form-control" value={todoText} onChange={onChangeTodoText} placeholder={todoText} /> : <h4>{todo.text}</h4>}
        </div>
        <div className="col" onClick={onToggle}>{todo && todo.isCompleted ? <h4>Done</h4> : <h4>Yet</h4>}</div>
        { editable && <button className="btn btn-primary m-2" onClick={onUpdateTodo}>save</button> }
        <button className="btn btn-danger m-2" onClick={onDeleteTodo}>Delete</button>
      </div>
    </div>
  )
}

export default TodoItem
