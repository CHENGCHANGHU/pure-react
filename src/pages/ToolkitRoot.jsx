import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, asyncIncrement } from 'store/ToolkitStore';

const Style = {
  box: {
    display: 'flex',
    flexFlow: 'row nowrap',
    columnGap: '16px',
  }
};

export default function ToolkitRoot() {
  const count = useSelector(state => state.count);
  const dispatch = useDispatch();
  return (
    <div style={ Style.box }>
      <span>{ count }</span>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(asyncIncrement(2))}>Async Increment 2</button>
    </div>
  );
};


