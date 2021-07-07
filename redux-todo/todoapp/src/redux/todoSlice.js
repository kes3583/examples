import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {nanoid} from 'nanoid';
//const fetchUrl = 'http://localhost:5001' // package.json 에서 proxy 설정

export const getTodosAsync = createAsyncThunk('todos/getTodosAsync', async () => {
    const response = await fetch('/todos');
    if (response.ok) {
        const todos = await response.json();
        return {todos}
    }
})

export const addTodoAsync = createAsyncThunk('todos/addTodoAsync', async (payload) => {
    console.log('payload', payload)
    const response = await fetch('/todos', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({text: payload.text, isCompleted:false})
    });
    if (response.ok) {
        const todo = await response.json();
        return { todo };
    }

});

export const toggleCompleteAsync = createAsyncThunk('todos/toggleCompleteAsync', async (payload) => {
    const response = await fetch(`/todos/${payload.id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({isCompleted: payload.isCompleted})
    });
    if (response.ok) {
        console.log('response')
        const todo = await response.json();
        console.log('toggle todo', todo)
        return {todo}
    }

});

export const updateTodoAsync = createAsyncThunk('todos/updateTodoAsync', async (payload) => {
    const response = await fetch(`/todos/${payload.id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({text: payload.text})
    });
    if (response.ok) {
        const todo = await response.json();
        return {todo}
    }
});

export const deleteTodoAsync = createAsyncThunk('todos/deleteTodoAsync', async (payload) => {
    const response = await fetch(`/todos/${payload.id}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        return {id: payload.id}
    }
});

const todoSlice = createSlice({
    name: 'todos',
    initialState: [],
    reducers: {
        addTodo(state, action) {
            const newTodo = {
                id: nanoid(),
                text: action.payload.text,
                isCompleted: false,
            };
            state.push(newTodo)
        },
        deleteTodo(state, action) {
            return state.filter((todo) => todo.id !== action.payload.id);
        },
        updateTodo(state, action) {
            const todo = action.payload;
            return state.map((item) => {
                if (item.id === todo.id) {
                    return {
                        ...item,
                        text: todo.text
                    };
                }
                return item;
            })
        },
        toggleComplete(state, action) {
            const index = state.findIndex((todo) => todo.id === action.payload.id)
            state[index].isCompleted = action.payload.isCompleted
        }
    },
    extraReducers: {
        [getTodosAsync.pending]: () => {
            console.log('fetching data...')
        },
        [getTodosAsync.fulfilled]: (state, action) => {
            console.log(`action.payload.todos`, action.payload.todos)
            return action.payload.todos
        },
        [addTodoAsync.fulfilled]: (state, action) => {
            state.push(action.payload.todo)
        },
        [toggleCompleteAsync.fulfilled]: (state, action) => {
            console.log('state from toggle', state)
            const index = state.findIndex((todo) => todo.id === action.payload.todo.id)
            state[index].isCompleted = action.payload.todo.isCompleted;
        },
        [updateTodoAsync.fulfilled]: (state, action) => {
            console.log('action from update', action.payload)
            const todo = action.payload.todo;
            return state.map((item) => {
                if (item.id === todo.id) {
                    return {
                        ...item,
                        text: todo.text
                    };
                }
                return item;
            })
        },
        [deleteTodoAsync.fulfilled]: (state, action) => {
            console.log('state from delete', state)
            console.log('action from delete', action.payload)
            return state.filter((todo) => todo.id !== action.payload.id);
        }

    }
});

//export const {addTodo, toggleComplete, deleteTodo, updateTodo} = todoSlice.actions;
export default todoSlice.reducer;

