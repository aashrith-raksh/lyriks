import { configureStore } from '@reduxjs/toolkit'
import shazamCoreApi from './services/shazamCore'
import playerReducer from './features/playerSlice'
import songsFilterReducer from './features/songsFilterSlice'

export const store = configureStore({
  reducer: {
    [shazamCoreApi.reducerPath]: shazamCoreApi.reducer,
    player: playerReducer,
    songsFilter:songsFilterReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(shazamCoreApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch