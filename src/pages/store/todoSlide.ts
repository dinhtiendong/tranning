import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TodoProp } from "../interfaces";



export const todoSlide = createSlice({
    name:'todo',
     initialState: [] as TodoProp[], 
     reducers: {
        addTodo: (state: TodoProp[],action:PayloadAction<TodoProp> ) =>{
            const newTodo = {
                ...action.payload
            }

            state.push(newTodo);

                      
            return state;
        },

        editTodo: (state: TodoProp[],action:PayloadAction<{value: string,id: string }> ) =>{

           
                const index = state.findIndex(
                  (todo) => todo.id === action.payload.id
                );

                state[index].name = action.payload.value;
          
                return state;
        },
        editNumTodo: (state: TodoProp[],action:PayloadAction<{value: number,id: string }> ) =>{

           
            const index = state.findIndex(
              (todo) => todo.id === action.payload.id
            );

            state[index].point = action.payload.value;
      
            return state;
    },
        deleteTodo: (state: TodoProp[],action:PayloadAction<string> ) =>{

                return state.filter((e) => e.id !== action.payload);
          
        },
        handleCheck:(state: TodoProp[],action:PayloadAction<{id: string, newStatus: boolean}> )=>{

                const index = state.findIndex(
                        (todo) => todo.id === action.payload.id
                      );
                
                state[index].status = action.payload.newStatus;
                
                
        },

        handleChange:(state: TodoProp[],action:PayloadAction<{idx: number, newStatus: boolean}> )=>{

            state[action.payload.idx].status = action.payload.newStatus;
            
            
    },

    handleBlurRedux:(state: TodoProp[],action:PayloadAction<{id: string,prevValue: string, prevNum: number}> )=>{

                const newValue = state.findIndex((e) => e.id === action.payload.id);
                state[newValue].name = action.payload.prevValue;
                state[newValue].point = action.payload.prevNum;
          
         return state;   
    },
    handleOnKeyDownRedux:(state: TodoProp[],action:PayloadAction<{id: string,idx: number }> )=>{

        const result = state.find((e) => e.id === action.payload.id);

        if (result?.id === action.payload.id) {
                state[action.payload.idx].flag = true
        }
  
         return state;   
    },
    handleChangeOption:(state: TodoProp[],action:PayloadAction<{value: string,id: string}> )=>{
                 const index = state.findIndex(
                (todo) => todo.id === action.payload.id
              );
  
              state[index].priority = action.payload.value;
        
              return state;
        }

     }

})


export default todoSlide.reducer;
export const { addTodo,deleteTodo,editTodo,editNumTodo,handleChangeOption,handleCheck,handleBlurRedux,handleOnKeyDownRedux } = todoSlide.actions
