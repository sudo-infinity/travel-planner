import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { getWeather } from '../api/weather';

dayjs.extend(utc);

const WeatherCard = ({ location, units }) => {
  const isMetric = units.match(/metric/i);
  const [ weather, setWeather ] = useState();

useEffect(()=>{
    const getCurrentWeather = async () => {
        const weatherResponse = await getWeather(
            location.latitude,
            location.longitude,
            'current',
            '',
          );
          console.log(weatherResponse);
          setWeather(weatherResponse);
      };
    getCurrentWeather(location);
},[location]);

  return (
    <>
    {weather && (
        <div className="m-4">
        <div className="sm">
          <p className="text-2xl font-semibold tracking-wide dark:text-white">
            {weather.location.name}, {weather.location.country}
          </p>
          <p className="tracking-wide text-gray-500 dark:text-gray-400">
            {weather.location.localtime}, {weather.location.tz_id}
            , {weather.current.condition.text}
          </p>
        </div>
        <div className="my-8 flex flex-row justify-between text-5xl tracking-wide lg:my-4 lg:text-6xl">
          <span className="mt-6 font-light text-gray-500 dark:text-white md:mt-10">
            {weather.current.temp_c}&deg;
            <span className="mt-1 flex flex-col text-base font-normal tracking-wide text-gray-500 dark:text-gray-400">
              , Feels like {weather.current.feelslike_c}&deg;
            </span>{' '}
          </span>
          <div className="mt-4 text-8xl text-indigo-700 dark:text-white sm:text-9xl">
            <span><img src={`https:/${weather.current.condition.icon}` } alt='Weather Icon' /></span>
          </div>
        </div>
        <div className="mt-1 text-indigo-700 dark:text-gray-400">
          <span className="wi wi-strong-wind text-xl"></span>
          <span className="ml-1 mr-2 tracking-wide text-gray-500 dark:text-white">
            {isMetric ? `${weather.current.wind_kph} kmph winds, ` : `${weather.current.wind_mph} mph winds, `} 
          </span>
          <span className="wi wi-humidity text-xl"></span>
          <span className="ml-1 tracking-wide text-gray-500 dark:text-white">
            {weather.current.humidity}% humidity
          </span>
        </div>
      </div>
      )}      
    </>
  );
};

export default WeatherCard;
