import { useCallback, useEffect, useState } from 'react';

export function useAsyncState<T>(
  loader: () => Promise<T>,
  initialState: T,
  option: { immediate: boolean } = { immediate: true },
) {
  const { immediate } = option;

  const [state, setState] = useState(initialState);
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    setState(await loader());
    if (!ready) {
      setReady(true);
    }
    setLoading(false);
  }, [loader]);

  useEffect(() => {
    if (immediate) {
      load();
    }
  }, []);

  return {
    state,
    ready,
    loading,
    load,
  };
}
