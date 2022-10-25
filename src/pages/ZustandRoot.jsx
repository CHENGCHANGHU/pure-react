import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useCounter } from 'store/ZustandStore';

const Style = {
  box: {
    display: 'flex',
    flexFlow: 'row nowrap',
    columnGap: '16px',
  }
};

export default function ZustandRoot() {
  const { count, increment, decrement, asyncIncrement } = useCounter(state => state);
  return (
    <div style={ Style.box }>
      <span>{ count }</span>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={() => asyncIncrement(2)}>Async Increment 2</button>
    </div>
  );
};


