import React from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import WeatherCard from "../WeatherCard/WeatherCard";
import { defaultClothingItems } from "../../utils/constants";
import ItemCard from '../ItemCard/ItemCard'
import './Main.css'

function Main({ weatherData, handleCardClick, clothingItems }){
    const { currentTemperatureUnit } = React.useContext(CurrentTemperatureUnitContext);

    return(
        <main>
            <WeatherCard weatherData={weatherData}/>
            <section className='cards'>
                <p className="cards__text">Today is {weatherData.temp[currentTemperatureUnit]} / You may want to wear:</p>
            </section>
            <ul className='cards__list'>
                {clothingItems.filter((item) => {
                    return item.weather.toLowerCase() === weatherData.type;
                })
                .map((item) => {
                    return (
                        <ItemCard key={item._id} item={item} handleCardClick={handleCardClick} clothingItems={clothingItems}/>
                    )
                })}
            </ul>
        </main>
    )
}

export default Main;