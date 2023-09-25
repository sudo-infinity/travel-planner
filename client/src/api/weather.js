const BASE_URL = `http://api.weatherapi.com/v1`

export async function getWeather(lat, lng, weatherTime, forecastDays) {
    const response = await fetch(`${BASE_URL}/${weatherTime}.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${lat},${lng}${forecastDays}`);
    return response.json();
  }