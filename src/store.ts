import { configureStore } from '@reduxjs/toolkit'
import profileReducer from './userProfileSlice'

const store = configureStore({
  reducer: {
    userProfile: profileReducer
  }
})

export default store;

export type TGetState = typeof store.getState
export type RootState = ReturnType<TGetState>
export type AppDispatch = typeof store.dispatch