import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sleep } from 'utils';

function incrementByStep (...args) {
  console.log(args);
}

export const asyncIncrement = createAsyncThunk('async-increment', async (payload, ...args) => {
  console.log(payload, args);
  // dispatch(incrementByStep(payload));
  await sleep(3000);
  return payload;
});
 
const CounterSlice = createSlice({
  name: 'counter',
  initialState: {
    count: 0,
    others: {},
  },
  reducers: {
    increment: state => ({ ...state, count: state.count + 1 }),
    decrement: state => { state.count -= 1; },
    incrementByStep,
  },
  extraReducers: builder => {
    builder
      .addCase(asyncIncrement.fulfilled, (state, action) => {
        console.log(action);
        state.count += action.payload;
      });
  }
});

export const {
  increment,
  decrement,
} = CounterSlice.actions;

export default CounterSlice;
