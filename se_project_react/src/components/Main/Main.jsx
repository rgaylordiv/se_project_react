import WeatherCard from "../WeatherCard/WeatherCard";
import { defaultClothingItems } from "../../utils/constants";
import ItemCard from '../ItemCard/ItemCard'
import './Main.css'

function Main({ weatherData, handleCardClick }){
    return(
        <>
        <main>
            <WeatherCard weatherData={weatherData}/>
            <section className='cards'>
                <p className="cards__text">Today is {weatherData.temp.F}&deg; / You may want to wear:</p>
                {/* TODO - add the cards */}
            </section>
            <ul className='cards__list'>
                {defaultClothingItems.filter((item) => {
                    return item.weather === weatherData.type;
                })
                .map((item) => {
                    return (
                        <ItemCard key={item._id} item={item} handleCardClick={handleCardClick}/>
                    )
                })}
            </ul>
        </main>
        </>
    )
}

export default Main;