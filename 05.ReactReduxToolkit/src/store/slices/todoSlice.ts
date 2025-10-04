
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type State={
    id:string,
    name:string,
    description:string
}


const todoSlice=createSlice(
    {
        name:"Todo",
        initialState:[] as State[],
        reducers:{
            addItem:(state:State[],action:PayloadAction<State>)=>{
                return [...state,action.payload]
            },
            removeItem:(state:State[],action:PayloadAction<string>)=>{
                return state.filter((todo)=>todo.id!==action.payload)
            }
        }
    }
)


export const {addItem,removeItem}=todoSlice.actions


export default todoSlice.reducer