import React, {useEffect} from 'react';
import TodoItem from './TodoItem';
import {useDispatch, useSelector} from 'react-redux';
import {getTodosAsync} from '../redux/todoSlice';

function TodoList() {
    const dispatch = useDispatch();
    const todos = useSelector((state) => state.todos);
    console.log('todos',todos)
    useEffect(() => {
        dispatch(getTodosAsync());
    },[dispatch])
    return (
        <div className="my-4">
            <h3>TodoList</h3>
            {todos.map((todo) => (
                    <TodoItem key={todo.id} todo={todo}/>
                )
            )}
        </div>
    )
}

export default TodoList
