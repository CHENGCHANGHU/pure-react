import React, { useState, useCallback } from 'react';
import { useAsyncState } from './base';
import { sleep } from 'src/utils';

export function useGeolocation() {
  const [latitude, setLatitude] = useState(0); // 纬度
  const [longitude, setLongitude] = useState(0); // 经度

  const setGeolocation = useCallback(async () => {
    return new Promise<void>((resolve) => {
      navigator.geolocation.getCurrentPosition(async position => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        resolve();
      });
    });
  }, []);

  const { ready, loading, load } = useAsyncState(setGeolocation, null);

  return {
    latitude,
    longitude,
    ready,
    loading,
    load,
  };
}
