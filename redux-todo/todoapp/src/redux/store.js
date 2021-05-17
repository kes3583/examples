import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice";

// import {createLogger} from "redux-logger";
// const logger = createLogger();

export default configureStore({
    reducer: {
        todos: todoReducer,
    }
});