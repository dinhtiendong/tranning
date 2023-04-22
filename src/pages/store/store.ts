
import { configureStore } from '@reduxjs/toolkit'
import todoReducer from "./todoSlide"



export const store = configureStore({
    reducer: {
        todo: todoReducer,
      },

  })


  export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch