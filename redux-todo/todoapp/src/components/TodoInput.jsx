import React from 'react'

function TodoInput() {
  return (
    <div>
      <div className="row m-2">
        <input type="text" className="col form-control"/>
        <button className="btn btn-primary m-2">Add</button>        
      </div>
    </div>
  )
}

export default TodoInput
