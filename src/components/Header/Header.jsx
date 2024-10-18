import './Header.css'
import { React, useContext } from 'react';
import { Link } from 'react-router-dom';
import headerLogo from '../../assets/headerLogo.svg'
import avatarLogo from '../../assets/avatarLogo.svg'
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Header({ handleAddClick, weatherData, isLoggedIn, handleRegisterClick, handleLoginClick }){
    const currentDate = new Date().toLocaleString('default', { month: 'long', day: 'numeric' });

    const { currentUser }= useContext(CurrentUserContext);

    const avatarPlaceholder = currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : '?';

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
                        {isLoggedIn ? (
                            <>
                            <li>
                                <button onClick={handleAddClick} className='button__add-clothes' type='button'>+ Add clothes</button>
                            </li>
                            <li>
                                <Link to='/profile' className='header__profile-link'>
                                    <div className='header__nav_user'>
                                        <p className='header__nav_user-name'>
                                            {isLoggedIn && currentUser?.name ? currentUser.name : 'Guest'}
                                        </p>
                                        {isLoggedIn && currentUser?.avatar ? (
                                            <img className='header__nav_avatar_logo' src={currentUser.avatar} alt={currentUser.name}/> 
                                        ) : (
                                            <img className='header__nav_avatar_logo' src={avatarPlaceholder} alt={avatarPlaceholder}/> 
                                        )}
                                    </div>
                                </Link>
                            </li>
                            </>
                        ) : (
                            <>
                            <li>
                                {/* <Link to='/signup' className='header__profile-link'>
                                    <div className='header__nav_user'>
                                        <p className='header__nav_register'>Sign Up</p>
                                    </div>
                                </Link> */}
                                <div className='header__nav_user'>
                                    <button onClick={handleRegisterClick} className='header__nav_register' type='button'>Sign Up</button>
                                </div>
                            </li>
                            <li>
                                {/* <Link to='/signin' className='header__profile-link'>
                                    <div className='header__nav_user'>
                                        <p className='header__nav_login'>Log In</p>
                                    </div>
                                </Link> */}
                                <div className='header__profile-link'>
                                    <div className='header__nav_user'>
                                        <button onClick={handleLoginClick} className='header__nav_login' type='button'>Log In</button>
                                    </div>
                                </div>
                            </li>
                        </>
                        )}
                        {/* <li>
                            <Link to='/profile' className='header__profile-link'>
                                <div className='header__nav_user'>
                                    <p className='header__nav_avatar-name'>Terrence Tegegne</p>
                                    <img className='header__nav_avatar_logo' src={avatarLogo} alt='Avatar'/>
                                </div>
                            </Link>
                        </li> */}
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header