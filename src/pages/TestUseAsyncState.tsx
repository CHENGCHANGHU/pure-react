import React, { useEffect, useRef } from 'react';
import { sleep } from 'src/utils';
import { useAsyncState, useGeolocation, useTimezone } from "src/hooks";

async function request(): Promise<Date> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(new Date()), 3000);
  });
}

export default function TestUseAsyncState() {
  const { state, ready, loading, load } = useAsyncState(request, null);

  const { longitude, latitude, ready: geoReady, loading: geoLoading, load: geoLoad } = useGeolocation();
  const { timezone, load: loadTimezone } = useTimezone({ longitude, latitude });

  async function test() {
    await sleep(3000);
    await load();
    await sleep(1000);
    await load();
  }

  useEffect(() => {
    test();
  }, []);

  return (
    <div>
      state: {state?.toString()}, 
      ready: {ready.toString()}, 
      loading: {loading.toString()}
      <Child
        state={state}
      />
      <ul>
        longitude: {longitude}, 
        latitude: {latitude}, 
        <button onClick={geoLoad}>Load Geolocation</button>
        {geoLoading ? 'loading' : ''}
      </ul>
      <ul>
        timezone: {JSON.stringify(timezone)},
      </ul>
    </div>
  );
}

function Child(props: any) {
  const { state } = props;
  return (
    <div>
      Child state: {state?.toString()}
    </div>
  );
}
