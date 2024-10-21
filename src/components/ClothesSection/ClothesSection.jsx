import { React, useContext } from "react";
import './ClothesSection.css';
//import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";


function ClothesSection({ handleCardClick, clothingItems, handleAddClick, onCardLike }){

    const { currentUser } = useContext(CurrentUserContext);

    const userClothingItems = clothingItems.filter(item => item.owner === currentUser._id);
    

    return(
        <div className="clothes-section">
            <div className="clothes-section__header">
                <p className="clothes-section__title">Your Items</p>
                <button className="clothes-section__button" onClick={handleAddClick}>+ Add New</button>
            </div>
            <ul className='cards__list'> 
                {userClothingItems
                    .map((item) => {
                    return (
                    <ItemCard 
                        key={item._id} 
                        item={item} 
                        handleCardClick={handleCardClick}
                        onCardLike={onCardLike}
                    />
                    )
                })}
            </ul>
        </div>
    )
}

export default ClothesSection;

