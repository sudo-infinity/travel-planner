import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import moment from 'moment';
import PropTypes from 'prop-types';
// import { useWeather } from '../hooks/useWeather';
import Loading from './Loading';
import { getWeather } from '../api/weather';

const Forecast = ({ location }) => {
    const [ weather, setWeather ] = useState();
    const [ forecast, setForecast ] = useState([]);

useEffect(()=>{
    const getFutureWeather = async () => {
        const weatherResponse = await getWeather(
            location.latitude,
            location.longitude,
            'forecast',
            '&days=4',
          );
          console.log("forecast", weatherResponse);
          setForecast(weatherResponse.forecast.forecastday);
      };
    getFutureWeather(location);
},[location]);

  return (
    <>
       <div className="m-4">
        <div className="">
          {forecast.map((item) => {
            return (
              <div className="row" key={forecast.indexOf(item)}>
                <div className='col-md-4 pt-4'>
                      {moment(item.date).format('dddd')}
                </div>
                <div className='col-md-4 text-center'>
                    <img src={`https:/${item.day.condition.icon}` } alt='Weather Icon' />
                </div>
                <div className='col-md-4 pt-4 text-center'>
                    {item.day.maxtemp_c}&deg; / {item.day.mintemp_c}&deg;
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Forecast;