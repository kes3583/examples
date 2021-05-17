import React, {useState, useCallback} from 'react'
import { addTodo } from '../redux/todoSlice';
import { useDispatch } from 'react-redux';

function TodoInput() {
  const [todoText, setTodoText] = useState('')
  const [warningText, setWarningText] = useState(false)
  const dispatch = useDispatch()

  function onChangeTodoText (e) {
    setTodoText(e.target.value)
    setWarningText(false)
  }

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    if (!todoText) {
      return setWarningText(true) // 경고메세지 표출하고 함수 빠져나가기 
    }
    dispatch(addTodo({text: todoText}));
    setTodoText('');
  }, [todoText])

  return (
    <form onSubmit={onSubmit}>
      <div className="row m-2">
        <input type="text" className="col form-control" value={todoText} onChange={onChangeTodoText} placeholder="type your word to do"/>
        <button type="submit" className="btn btn-primary m-2">Add</button>   
        
      </div>
      {warningText && <div className="row m-2 alert alert-warning">Please type your work to do!</div>}
    </form>
  )
}

export default TodoInput
