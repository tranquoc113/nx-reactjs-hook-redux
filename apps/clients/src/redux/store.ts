import { configureStore } from '@reduxjs/toolkit';
import { counterSlice, languageSlice } from '@mycloudfly/redux';

export const store = configureStore({
  reducer:
    {
      counter: counterSlice.reducer,
      language: languageSlice.reducer
    },
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
