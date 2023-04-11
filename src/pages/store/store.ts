import { configureStore } from "@reduxjs/toolkit";
import { todoslide }from './todoSlide'

export const store = configureStore({
    reducer:{
        todo: todoslide
    }
})