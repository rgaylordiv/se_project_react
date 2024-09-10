import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';
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
import { getWeather, filterWeatherData } from '../../utils/weatherApi.js'
import { CurrentTemperatureUnitContext } from '../../contexts/CurrentTemperatureUnitContext.jsx'
import { defaultClothingItems } from '../../utils/constants.js';
import { getItems, addItem, removeItem } from '../../utils/api.js';

function App() {
  const [weatherData, setWeatherData] = useState({ type: '', temp: { F: 999, C: 999}});
  const [activeModal, setActiveModal] = useState('');
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  // const [value, setValue] = useState(false);

  const handleCardClick = (card) => {
    setActiveModal('preview');
    setSelectedCard(card);
  }

  const handleAddClick = () => {
    setActiveModal('add-garment');
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



  // const handleAddItemSubmit = () => {
  //   setClothingItems([items, ...clothingItems]);
  // }

  // const handleDeleteItem = (itemId) => {
  //   setClothingItems(clothingItems.filter(item => item._id !== itemId));
  //   closeActiveModal();
  // }

  const handleAddItemSubmit = (item) => {
    addItem(item)
      .then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);
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

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error)
  }, []);

  useEffect(() => {
    getItems().then((data) => {
      setClothingItems(data);
    }).catch(console.error);
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
    <div className='app'>
      <CurrentTemperatureUnitContext.Provider value={{ currentTemperatureUnit, handleToggleSwitchChange }}>
      <div className='app__wrapper'>
        <Header  handleAddClick={handleAddClick} weatherData={weatherData}/>
        <Routes>
          <Route path='/' element={<Main weatherData={weatherData} handleCardClick={handleCardClick} handleAddItemSubmit={handleAddItemSubmit} clothingItems={clothingItems}/>}/>
          <Route path='/profile' element={<Profile handleCardClick={handleCardClick} clothingItems={clothingItems} handleAddClick={handleAddClick}/>}/>
        </Routes>
        {/* <Main weatherData={weatherData} handleCardClick={handleCardClick}/> */}
        <Footer />
      </div>
      <AddItemModal closeActiveModal={closeActiveModal} isOpen={activeModal === "add-garment"} activeModal={activeModal} onAddItem={handleAddItemSubmit}/>
      {/* <ModalWithForm buttonText='Add garment' title='New garment' activeModal={activeModal} closeActiveModal={closeActiveModal} isOpen={activeModal === "add-garment"}>
      <label className='modal__form-group' htmlFor='name' id='modal-name'>
        <span className='modal__form-title'>Name</span>
        <input type='text' placeholder='Name' className='modal__form-input' name='name' id='name' required />
        <span className='modal__input-error'></span>
      </label>
      <label className='modal__form-group' htmlFor='imageURL'>
        <span className='modal__form-title'>Image</span>
        <input type="url" placeholder="Image URL" id='imageURL' className="modal__form-input modal__input_type_url" name="image" required />
        <span className="modal__input-error" id="post-image-url-input-error"></span>
      </label>
      <fieldset className='modal__radio-buttons'>
        <legend className='modal__legend'>Select the weather type:</legend>
        <label className='modal__label modal__label_type_radio' htmlFor='hot' id='radio-button'>
          <input type='radio' name='weather' className='modal__radio-input' id='hot'/> Hot
        </label>
        <label className='modal__label modal__label_type_radio' htmlFor='warm' id='radio-button'>
          <input type='radio' name='weather' className='modal__radio-input' id='warm'/> Warm
        </label>
        <label className='modal__label modal__label_type_radio' htmlFor='cold' id='radio-button'>
          <input type='radio' name='weather' className='modal__radio-input' id='cold'/> Cold
        </label>
      </fieldset>
      </ModalWithForm> */}
      <ItemModal activeModal={activeModal} selectedCard={selectedCard} closeActiveModal={closeActiveModal} handleDeleteItem={handleDeleteItem}/>
      </CurrentTemperatureUnitContext.Provider>
    </div>
  )
}

export default App
