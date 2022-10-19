import React, { useState, useEffect } from 'react';
import { get } from 'utils';

// Weather information code table: https://www.jodc.go.jp/data_format/weather-code.html
// List of tz database time zones: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
// GeoNames: https://www.geonames.org/
// reverse geocoding: http://code.google.com/apis/maps/documentation/geocoding/#ReverseGeocoding

export default function WeatherForecast(props) {
  console.log('[WeatherForecast start rendering]');

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [temperature, setTemperature] = useState(0); // option + shift + 8 => °

  useEffect(() => {
    console.log('[WeatherForecast effect running]');

    navigator.geolocation.getCurrentPosition(position => {
      console.log(position);
      console.log(- (new Date()).getTimezoneOffset() / 60);
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });

    async function getWeatherForecast() {
      const response = await get('https://api.open-meteo.com/v1/forecast', {
        latitude,
        longitude,
        current_weather: true,
        // http://api.geonames.org/timezoneJSON?lat=22.53&lng=113.94&username=tigercheng
        timezone: 'Asia/Shanghai',
      });
      const weatherData = await response.json();
      console.log(weatherData);
      setTemperature(weatherData.current_weather.temperature);
    }

    async function getCityInfo() {
      const response = await get('http://api.geonames.org/countrySubdivisionJSON', {
        lat: latitude.toFixed(2),
        lng: longitude.toFixed(2),
        username: 'tigercheng',
      });
      const cityData = await response.json();
      console.log(cityData);
    }

    getWeatherForecast();
    getCityInfo();
  }, [latitude, longitude]);

  return (
    <>
      <div>weather forecast: Latitude(纬度): {latitude} Longitude(经度): {longitude}</div>
      <div>{ temperature }°C</div>
    </>
  );
};
