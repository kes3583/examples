import React, { useState, useCallback} from 'react'
import { useDispatch } from 'react-redux'
import { updateTodo, deleteTodo } from '../redux/actions'

function TodoItem({ todo }) {
  const [editable, setEditable] = useState(false)
  const [todoText, setTodoText] = useState(todo.text)
  const dispatch = useDispatch();

  const onUpdate = useCallback( (id) => {
    console.log('id :>> ', id);
    console.log('todo text', todoText)
    setEditable(!editable)
    
    // dispatch(updateTodo(
    //   { 
    //     id:id,
    //     text:todoText
    //   }
    // ));
    if(editable){
      setTodoText(todo.text)
    }
    
    
  },[editable])
  
  function onChangeTodoText(e) {
    setTodoText(e.target.value)

  }

  return (
    <div>
      <div className="row mx-2 align-items-center">
        <div>#{todo.id.length> 1? todo.id[2]: todo.id}</div>
        <div className="col">
          {editable ? <input type="text" className="col form-control" value={todoText} onChange={onChangeTodoText} placeholder={todoText} /> : <h4>{todo.text}</h4>}
        </div>
        <div className="col">{todo.isCompleted ? <h4>Done</h4> : <h4>Yet</h4>}</div>
        <button className="btn btn-primary m-2" onClick={ () => {
          console.log(`todoText`, todoText)
          dispatch(updateTodo(
            { 
              ...todo,
              id:todo.id,
              text:todoText
            }
          ));
          if(editable){
            setTodoText(todo.text)
          }
          setEditable(!editable)
        }}>
        
        { editable ? 
          // <>
          //   <button className="btn btn-primary m-2" onClick={onUpdate(todo.id)}>v</button>
          //   <button className="btn btn-primary m-2" onClick={() => setEditable(!editable)}>X</button>
          // </> : 
          "UPDATE" : "EDIT"
        }
        </button>
        <button className="btn btn-danger m-2" onClick={()=>dispatch(deleteTodo(todo.id))}>Delete</button>
      </div>
    </div>
  )
}

export default TodoItem
