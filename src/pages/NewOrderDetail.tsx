import React, { useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import { RecoilDevTools } from 'recoil-gear';
import { FunctionalPage } from '@shopee-rn/seller-svs/core';
import { ActionBar } from '@shopee-rn/seller-svs/components';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const Count = atom({
  key: 'count',
  default: {
    value: 0,
    other: 0,
  },
});

// const Random = selector();

function RecoilContent(props: any) {
  const [count, setCount] = useRecoilState(Count);
  const add = () => setCount({
    value: count.value + 1,
    other: Math.random(),
  });
  const text = '(Recoil) Add';
  const text2 = '(Recoil) Async Add';
  const asyncAdd = async () => {
    await sleep(2000);
    setCount({
      value: count.value + 1,
      other: Math.random(),
    });
  };
  return (
    <>
      <Text>
        {count.value}
        |
        {count.other}
      </Text>
      <Button title={text} onPress={add} />
      <Button title={text2} onPress={asyncAdd} />
    </>
  );
}

//
// import { createSlice, createAsyncThunk, configureStore } from '@reduxjs/toolkit';
// import { Provider, useSelector, useDispatch } from 'react-redux';

// export const asyncIncrement = createAsyncThunk('async-increment', async (payload, ...args) => {
//   console.log(payload, args);
//   await sleep(3000);
//   return payload;
// });

// const CounterSlice = createSlice({
//   name: 'counter',
//   initialState: {
//     count: 0,
//     others: {},
//   },
//   reducers: {
//     increment: state => ({ ...state, count: state.count + 1 }),
//     decrement: state => ({ ...state, count: state.count - 1 }),
//     // increment: state => {
//     //   state.count += 1;
//     // },
//     // decrement: state => {
//     //   state.count -= 1;
//     // },
//   },
//   extraReducers: builder => {
//     builder
//       .addCase(asyncIncrement.fulfilled, (state, action: { payload: any }) => {
//         console.log(action);
//         state.count += action.payload;
//       });
//   },
// });

// const { increment, decrement } = CounterSlice.actions;

// const ToolkitStore = configureStore({
//   reducer: CounterSlice.reducer,
// });

// function ToolkitContent() {
//   const text = '(Toolkit) Add';
//   const text2 = '(Toolkit) Async Add';
//   const count = useSelector(state => {
//     console.log(state);
//     return state.count;
//   });
//   const dispatch = useDispatch();
//   return (
//     <>
//       <Text>
//         {count}
//       </Text>
//       <Button title={text} onPress={() => dispatch(increment())} />
//       <Button title={text} onPress={() => dispatch(decrement())} />
//       <Button title={text2} onPress={() => dispatch(asyncIncrement(2))} />
//     </>
//   );
// }

function OrderDetail(props: any) {
  // const { rootTag } = props;
  const [rootTag] = useState(props.rootTag);
  const [title] = useState('Order Detail');

  return (
    <RecoilRoot>
      <RecoilDevTools />
      <View style={style.page}>
        {/* topBar */}
        <ActionBar
          rootTag={rootTag}
          title={title}
          showChatButton={false}
          showBackButton={!!true}
          shadow={!!true}
        />
        <RecoilContent />
        {/* <Provider store={ToolkitStore}>
          <ToolkitContent />
        </Provider> */}
      </View>
    </RecoilRoot>
  );
}

const style = StyleSheet.create({
  page: {
    // backgroundColor: 'red',
  },
});

FunctionalPage('VALUE_ADD_ORDER_DETAIL_NEW', OrderDetail as any);
