import React from 'react';
import { weatherOptions, defaultWeatherOptions } from '../../utils/constants.js'
import { CurrentTemperatureUnitContext } from '../../contexts/CurrentTemperatureUnitContext.jsx';
import './WeatherCard.css'

function WeatherCard({ weatherData }){
    const weatherOption = weatherOptions.filter((option) => {
        return option.condition === weatherData.condition && option.day === weatherData.isDay;
    });

    const { currentTemperatureUnit } = React.useContext(CurrentTemperatureUnitContext);

    let filteredOptions;

    if (weatherOption.length === 0){
        filteredOptions = defaultWeatherOptions[weatherData.isDay ? 'day' : 'night'];
    } else{
        filteredOptions = weatherOption[0];
    }

    return(
        <section className='weather-card'>
            <p className='weather-card__temp'>{weatherData.temp[currentTemperatureUnit]}</p>
            <img src={filteredOptions?.url} alt={filteredOptions?.condition} className="weather-card__image" />
        </section>
    )
}

export default WeatherCard;