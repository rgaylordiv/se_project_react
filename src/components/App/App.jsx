import { useState, useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
//import reactLogo from '../../assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import '../ModalWithForm/ModalWithForm.css'
import { coordinates, APIkey } from '../../utils/constants.js'
import Header from '../Header/Header.jsx'
import Main from '../Main/Main.jsx'
//import ModalWithForm from '../ModalWithForm/ModalWithForm.jsx'
import ItemModal from '../ItemModal/ItemModal.jsx'
import Profile from '../Profile/Profile.jsx'
import AddItemModal from '../AddItemModal/AddItemModal.jsx';
import Footer from '../Footer/Footer.jsx'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.jsx';
import RegisterModal from '../RegisterModal/RegisterModal.jsx';
import LoginModal from '../LoginModal/LoginModal.jsx';
import EditProfileModule from '../EditProfileModal/EditProfileModule.jsx';
import { getWeather, filterWeatherData } from '../../utils/weatherApi.js'
import { CurrentTemperatureUnitContext } from '../../contexts/CurrentTemperatureUnitContext.jsx'
import { CurrentUserContext } from '../../contexts/CurrentUserContext.jsx'
import { defaultClothingItems } from '../../utils/constants.js';
import { getItems, addItem, removeItem, addCardLike, removeCardLike } from '../../utils/api.js';
import { getToken } from '../../utils/token.js';
import * as api from '../../utils/api.js';
import * as auth from '../../utils/auth.js';
import * as token from '../../utils/token.js';

function App() {
  const [weatherData, setWeatherData] = useState({ type: '', temp: { F: 999, C: 999}});
  const [activeModal, setActiveModal] = useState('');
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({ _id: '', name: '', email: '', avatar: ''});
  const [isLiked, setIsLiked] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleCardClick = (card) => {
    setActiveModal('preview');
    setSelectedCard(card);
  }

  const handleAddClick = () => {
    setActiveModal('add-garment');
  }

  const handleRegisterClick = () => {
    setActiveModal('signup');
  }

  const handleLoginClick = () => {
    setActiveModal('login');
  }

  const handleChangeClick = () => {
    setActiveModal('change');
  }

  const closeActiveModal = () => {
    setActiveModal('');
  }

  const handleToggleSwitchChange = () => {
    if(currentTemperatureUnit === 'C'){
      setCurrentTemperatureUnit('F');
  }

  if(currentTemperatureUnit === 'F'){
      setCurrentTemperatureUnit('C');
  }
  }

  const handleAddItemSubmit = (item) => {
    addItem(item)
      .then((newItem) => {
        setClothingItems([newItem.data, ...clothingItems]);
        closeActiveModal();
      })
      .catch(console.error);
  }

  const handleDeleteItem = (itemId) => {
    removeItem(itemId)
      .then(() => {
        setClothingItems((prevItems) => prevItems.filter(item => item._id !== itemId));
        closeActiveModal();
      })
      .catch(console.log);
  };

  const handleRegistration = ({
    name,
    avatar,
    email,
    password
  }) => {
    console.log("Registration Data:", { name, avatar, email, password });
    auth.register({name, avatar, password, email})
      .then(() => {
        handleAuthorization({ email, password });
        closeActiveModal();
        // navigate("/login");
      })
      .catch(console.error);
  };

  const handleAuthorization = ({ email, password }) => {
    if (!email || !password){
      return;
    }
    console.log("Login data:", { email, password });
    return auth
      .authorize({email, password})
        .then((data) => {
          if(data.token){
            console.log(`this is data.token: ${data.token}`);
            token.setToken(data.token); // added token here
            auth.getUserInfo(data.token) // was api but I corrected it
              .then((userData) => {
                setCurrentUser(userData);
                setIsLoggedIn(true);
                console.log('User logged in');
                closeActiveModal();
                navigate('/profile');
              })
          }
        })
        .catch(console.error);
  }

  const handleLogOut = () => {
    token.removeToken();
    setCurrentUser({ _id: '', name: '', email: '', avatar: '' });
    setIsLoggedIn(false);
    navigate('/');
  }

  const handleChange = ({ name, avatar }) => {
    return auth
      .editProfile({ name, avatar })
        .then((data) => {
          setCurrentUser(data);
          closeActiveModal();
          navigate('/');
        })
        .catch(console.error);
  }

  const handleCardLike = ({ id, isLiked }) => {
    const token = getToken(); // had as getToken()
    console.log(`id and isLiked:`, id, isLiked);
    // Check if this card is not currently liked
    !isLiked
      ? // if so, send a request to add the user's id to the card's likes array
        api
          // the first argument is the card's id
          .addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard.item : item))
            );
            setIsLiked(true);
          })
          .catch((err) => console.log(err))
      : // if not, send a request to remove the user's id from the card's likes array
        api
          // the first argument is the card's id
          .removeCardLike(id, token) 
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item)) // updatedCard.item does not work
            );
            setIsLiked(false);
          })
          .catch((err) => console.log(err));
  };
  
  const handleNavigationToLogin = () => {
    closeActiveModal();
    setActiveModal('login');
  }

  const handleNavigationToRegister = () => {
    closeActiveModal();
    setActiveModal('signup');
  }

  useEffect(() => {
    const jwt = token.getToken();

    if(!jwt){
      return;
    }

    auth
      .getUserInfo(jwt)
        .then(({ _id, name, email, avatar }) => {
          setIsLoggedIn(true); // added token
          setCurrentUser({ _id, name, email, avatar });
          console.log({ _id, name, email, avatar });
        })
        .catch(console.error);
  }, []);

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error)
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
    })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!activeModal) return; // stop the effect not to add the listener if there is no active modal

    const handleEscClose = (e) => {  // define the function inside useEffect not to lose the reference on rerendering
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {  // don't forget to add a clean up function for removing the listener
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);  // watch activeModal here

  return (
    <CurrentUserContext.Provider value={{currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn}} > {/*was isLogged in*/}
      <div className='app'>
        <CurrentTemperatureUnitContext.Provider value={{ currentTemperatureUnit, handleToggleSwitchChange }}>
        <div className='app__wrapper'>
          <Header  handleAddClick={handleAddClick} weatherData={weatherData} isLoggedIn={isLoggedIn} handleRegisterClick={handleRegisterClick} handleLoginClick={handleLoginClick} />
          <Routes>
            <Route path='/' element={<Main weatherData={weatherData} handleCardClick={handleCardClick} handleAddItemSubmit={handleAddItemSubmit} clothingItems={clothingItems} onCardLike={handleCardLike}/>}/>
            <Route path='/profile' element={<ProtectedRoute><Profile isLoggedIn={isLoggedIn} handleCardClick={handleCardClick} clothingItems={clothingItems} handleAddClick={handleAddClick} handleChangeClick={handleChangeClick} handleChange={handleChange} handleLogOut={handleLogOut} /></ProtectedRoute>}/>
          </Routes>
          <Footer />
        </div>
        <AddItemModal closeActiveModal={closeActiveModal} isOpen={activeModal === "add-garment"} activeModal={activeModal} onAddItem={handleAddItemSubmit}/>
        <ItemModal activeModal={activeModal} selectedCard={selectedCard} closeActiveModal={closeActiveModal} handleDeleteItem={handleDeleteItem}/>
        <RegisterModal isOpen={activeModal === 'signup'} closeActiveModal={closeActiveModal} handleRegistration={handleRegistration} handleNavigationToLogin={handleNavigationToLogin}></RegisterModal>
        <LoginModal isOpen={activeModal === 'login'} closeActiveModal={closeActiveModal} handleNavigationToRegister={handleNavigationToRegister} handleAuthorization={handleAuthorization}></LoginModal>
        <EditProfileModule isOpen={activeModal === 'change'} closeActiveModal={closeActiveModal} handleChange={handleChange} handleLogOut={handleLogOut}></EditProfileModule>
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
