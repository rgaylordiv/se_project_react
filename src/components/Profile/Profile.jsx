import React from "react";
import './Profile.css';
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({ handleCardClick, clothingItems, handleAddClick, handleChangeClick, handleChange, handleLogOut }){
    return(
        <div className="profile">
            <section className="profile__sidebar">
                <SideBar handleChangeClick={handleChangeClick} handleChange={handleChange} handleLogOut={handleLogOut}/>
            </section>
            <section className="profile__clothes-section">
                <ClothesSection handleCardClick={handleCardClick} clothingItems={clothingItems} handleAddClick={handleAddClick}/>
            </section>
        </div>
    );
}

export default Profile;