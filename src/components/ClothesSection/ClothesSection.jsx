import { React, useContext } from "react";
import './ClothesSection.css';
//import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";


function ClothesSection({ handleCardClick, clothingItems, handleAddClick }){

    const { currentUser } = useContext(CurrentUserContext);

    const isOwn = clothingItems.owner === currentUser._id;
    const userClothingItemsClassName = (
        `cards__list ${isOwn ? 'cards__list-visible' : 'cards__list-hidden'}`
    )

    return(
        <div className="clothes-section">
            <div className="clothes-section__header">
                <p className="clothes-section__title">Your Items</p>
                <button className="clothes-section__button" onClick={handleAddClick}>+ Add New</button>
            </div>
            <ul className={userClothingItemsClassName}> {/*this is where cards__list was*/}
                {clothingItems.map((item) => {
                    return (
                    <ItemCard 
                        key={item._id} 
                        item={item} 
                        handleCardClick={handleCardClick} 
                    />
                    )
                })}
            </ul>
        </div>
    )
}

export default ClothesSection;

