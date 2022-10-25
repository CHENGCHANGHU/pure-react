
import { configureStore, createSlice } from '@reduxjs/toolkit';
import CounterSlice from './ToolkitCounterSlice';

export * from './ToolkitCounterSlice';

export const ToolkitStore = configureStore({
  reducer: CounterSlice.reducer,
});
