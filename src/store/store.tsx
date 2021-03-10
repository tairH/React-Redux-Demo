import { configureStore } from "@reduxjs/toolkit";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import locationsReducer from './location.reducer'


export const store = configureStore({
    reducer:{
        locations:locationsReducer
    }
});