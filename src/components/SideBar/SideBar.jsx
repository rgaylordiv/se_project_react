import { React, useContext, useEffect, useState } from "react";
import "./SideBar.css";
import avatarLogo from "../../assets/avatarLogo.svg";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function SideBar({ handleChangeClick, handleLogOut }) {
  const { isLoggedIn, currentUser } = useContext(CurrentUserContext);
  const avatarPlaceholder = currentUser?.username
    ? currentUser.username.charAt(0).toUpperCase()
    : "?";

  return (
    <div>
      <div className="sidebar">
        {isLoggedIn ? (
          <>
            <img
              className="sidebar__avatar"
              src={currentUser.avatar}
              alt={currentUser.name}
            />
            <p className="sidebar__name">{currentUser.name}</p>
          </>
        ) : (
          <>
            <img
              className="sidebar__avatar"
              src={avatarPlaceholder}
              alt="Avatar Logo"
            />
            <p className="sidebar__name">Guest</p>
          </>
        )}
      </div>
      <button
        className="sidebar__change-button"
        type="button"
        onClick={handleChangeClick}
      >
        {isLoggedIn ? "Change profile data" : ""}
      </button>
      <button
        className="sidebar__log-button"
        type="button"
        onClick={handleLogOut}
      >
        Log Out
      </button>
    </div>
  );
}

export default SideBar;
