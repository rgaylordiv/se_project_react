import React from "react";
import './ClothesSection.css';
//import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ handleCardClick, clothingItems, handleAddClick }){
    return(
        <div className="clothes-section">
            <div className="clothes-section__header">
                <p className="clothes-section__title">Your Items</p>
                <button className="clothes-section__button" onClick={handleAddClick}>+ Add New</button>
            </div>
            <ul className='cards__list'>
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

