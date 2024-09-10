import React from "react";
import './Profile.css';
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({ handleCardClick, clothingItems, handleAddClick }){
    return(
        <div className="profile">
            <section className="profile__sidebar">
                <SideBar />
            </section>
            <section className="profile__clothes-section">
                <ClothesSection handleCardClick={handleCardClick} clothingItems={clothingItems} handleAddClick={handleAddClick}/>
            </section>
        </div>
    );
}

export default Profile;