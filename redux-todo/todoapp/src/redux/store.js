import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice";
import logger from "redux-logger";

export default configureStore({
    reducer: {
        todos: todoReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
