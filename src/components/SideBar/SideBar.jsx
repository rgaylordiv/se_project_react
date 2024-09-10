import React from "react";
import './SideBar.css';
import avatarLogo from '../../assets/avatarLogo.svg'

function SideBar(){
    return(
        <div className="sidebar">
            <img className="sidebar__avatar" src={avatarLogo} alt="Avatar Logo"/>
            <p className="sidebar__name">Terrance Tegegne</p>
        </div>
    )
}

export default SideBar;