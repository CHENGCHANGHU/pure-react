import create from 'zustand';
import { devtools } from 'zustand/middleware'
import { sleep } from 'utils';

export const useCounter = create((set, get) => ({
  count: 0,
  increment: () => set(state => ({ count: state.count + 1 })),
  decrement: () => set(state => ({ count: state.count - 1 })),
  asyncIncrement: async (payload) => {
    await sleep(3000),
    set(state => ({ count: state.count + payload }));
  },
}));
