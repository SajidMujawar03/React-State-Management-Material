import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice"
const store=configureStore({
    reducer:{
        product:productReducer
    },
    devTools:true
})

export type AppDispatch=typeof store.dispatch
export type RootState=ReturnType<typeof store.getState>
export default store