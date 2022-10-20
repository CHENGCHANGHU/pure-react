import React, { useState, useEffect } from 'react';
import { get } from 'utils';

// Weather information code table: https://www.jodc.go.jp/data_format/weather-code.html
// List of tz database time zones: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
// GeoNames: https://www.geonames.org/
// reverse geocoding: http://code.google.com/apis/maps/documentation/geocoding/#ReverseGeocoding

export default function WeatherForecast(props) {
  console.log('\n[rendering] start');

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [temperature, setTemperature] = useState(0); // option + shift + 8 => °
  const [loadingFlag, setLoadingFlag] = useState(true);
  const [timezoneId, setTimezoneId] = useState('GMT');

  useEffect(() => {
    console.log('[effect] set latitude and longitude');
    navigator.geolocation.getCurrentPosition(position => {
      console.log('\t position: ', position);
      // console.log(- (new Date()).getTimezoneOffset() / 60);
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);

  useEffect(() => {
    console.log('[effect] fetchTimezoneId')
    async function fetchTimezoneId() {
      const response = await get('http://api.geonames.org/timezoneJSON', {
        lat: latitude.toFixed(2),
        lng: longitude.toFixed(2),
        username: 'tigercheng',
      });
      const timezone = await response.json();
      console.log('\t timezone', timezone);
      setTimezoneId(timezone.timezoneId);
    }

    fetchTimezoneId();
  }, [latitude, longitude]);

  useEffect(() => {
    console.log('[effect] fetchCityInfo');
    async function fetchCityInfo() {
      const response = await get('http://api.geonames.org/countrySubdivisionJSON', {
        lat: latitude.toFixed(2),
        lng: longitude.toFixed(2),
        username: 'tigercheng',
      });
      console.log('\t cityData', cityData);
      const cityData = await response.json();
    }

    fetchCityInfo();
  }, [latitude, longitude]);

  useEffect(() => {
    console.log('[effect] init data');

    async function getWeatherForecast() {
      try {
        // console.log('\t timezoneId', timezoneId);
        const response = await get('https://api.open-meteo.com/v1/forecast', {
          latitude,
          longitude,
          current_weather: true,
          // http://api.geonames.org/timezoneJSON?lat=22.53&lng=113.94&username=tigercheng
          // timezone: 'Asia/Shanghai',
          timezone: timezoneId,
        });
        const weatherData = await response.json();
        console.log('\t weatherData', weatherData);
        setTemperature(weatherData?.current_weather?.temperature);
      } catch (e) {
        console.log(e);
      }
    }

    async function initData() {
      // await fetchTimezoneId();
      await getWeatherForecast();
      setLoadingFlag(false);
    }

    initData();
  }, [latitude, longitude, timezoneId]);

  return (
    <>
      {
        !loadingFlag && (
          <>
            <div>weather forecast: Latitude(纬度): {latitude} Longitude(经度): {longitude}</div>
            <div>{ temperature }°C</div>
          </>
        )
      }
    </>
    
  );
};
