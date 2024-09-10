import './Header.css'
import React from 'react';
import { Link } from 'react-router-dom';
import headerLogo from '../../assets/headerLogo.svg'
import avatarLogo from '../../assets/avatarLogo.svg'
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';

function Header({ handleAddClick, weatherData }){
    const currentDate = new Date().toLocaleString('default', { month: 'long', day: 'numeric' });

    return(
        <header className='header'>
            <div className='header__contents'>
                <Link to='/'>
                    <img className='header__logo' src={headerLogo} alt="App logo"/>
                </Link>
                {/* <img className='header__logo' src={headerLogo} alt="App logo"/> */}
                <p className="header__date">{currentDate}, {weatherData.city}</p>
            </div>
            <div className='header__nav'>
                <nav className='header__nav-bar'>
                    <ul className='header__nav_content'>
                        <li>
                            <ToggleSwitch />
                        </li>
                        <li>
                            <button onClick={handleAddClick} className='button__add-clothes' type='button'>+ Add clothes</button>
                        </li>
                        <li>
                            <Link to='/profile' className='header__profile-link'>
                                <div className='header__nav_user'>
                                    <p className='header__nav_avatar-name'>Terrence Tegegne</p>
                                    <img className='header__nav_avatar_logo' src={avatarLogo} alt='Avatar'/>
                                </div>
                            </Link>
                            {/* <div className='header__nav_user'>
                                <p className='header__nav_avatar-name'>Terrence Tegegne</p>
                                <img className='header__nav_avatar_logo' src={avatarLogo} alt='Avatar'/>
                            </div> */}
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header