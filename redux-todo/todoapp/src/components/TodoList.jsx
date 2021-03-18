import React from 'react'
import TodoItem from './TodoItem'
import { useSelector } from 'react-redux';

function TodoList() {
  const todos = useSelector(state => state.todos)
  console.log('todos :>> ', todos);
  return (
    <div className="my-4">
      <h3>TodoList</h3>
      {todos && todos.map( (todo, i) => {
        return <TodoItem key={todo.id} todo={todo} />
      })}
    </div>
  )
}

export default TodoList
