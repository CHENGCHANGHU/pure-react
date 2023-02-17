import { useCallback, useEffect, useState } from 'react';
import { get } from 'src/utils';
import { useAsyncState } from './base';

export function useTimezone({ latitude, longitude }: UseTimezoneParams) {
  const fetchTimezoneId = useCallback(async (): Promise<string> => {
    return new Promise(async resolve => {
      const response = await get('http://api.geonames.org/timezoneJSON', {
        lat: latitude.toFixed(2),
        lng: longitude.toFixed(2),
        username: 'tigercheng',
      });
      const timezone = await response.json();
      resolve(timezone);
    });
  }, [latitude, longitude]);

  const { state, ready, loading, load } = useAsyncState<string>(fetchTimezoneId, 'GMT');

  useEffect(() => {
    load();
  }, [latitude, longitude]);

  return {
    timezone: state,
    ready,
    loading,
    load,
  };
}

interface UseTimezoneParams {
  latitude: number,
  longitude: number,
}
