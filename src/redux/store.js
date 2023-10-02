import MainDataReducers from "./reducer/reducerIndex";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: MainDataReducers
})

export default store;