import {createSlice} from '@reduxjs/toolkit';
import {nanoid} from 'nanoid';

export const todoSlice = createSlice({
    name:'todos',
    initialState:[
        {
            id:1,
            text:'one',
            isCompleted:true
        },
        {
            id:2,
            text:'two',
            isCompleted: true
        },
        {
            id:3,
            text:'three',
            isCompleted: false
        },
        {
            id:4,
            text:'four',
            isCompleted:true
        }
    ],
    reducers:{
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
    }
});

export const { addTodo, toggleComplete, deleteTodo, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;