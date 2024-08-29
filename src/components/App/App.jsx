import { useState, useEffect } from 'react'
//import reactLogo from '../../assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import '../ModalWithForm/ModalWithForm.css'
import { coordinates, APIkey } from '../../utils/constants.js'
import Header from '../Header/Header.jsx'
import Main from '../Main/Main.jsx'
import ModalWithForm from '../ModalWithForm/ModalWithForm.jsx'
import ItemModal from '../ItemModal/ItemModal.jsx'
import Footer from '../Footer/Footer.jsx'
import { getWeather, filterWeatherData } from '../../utils/weatherApi.js'

function App() {
  const [weatherData, setWeatherData] = useState({ type: '', temp: { F: 999, C: 999}});
  const [activeModal, setActiveModal] = useState('');
  const [selectedCard, setSelectedCard] = useState({})

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

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error)
  }, [])

  return (
    <div className='app'>
      <div className='app__wrapper'>
        <Header  handleAddClick={handleAddClick} weatherData={weatherData}/>
        <Main weatherData={weatherData} handleCardClick={handleCardClick}/>
        <Footer />
      </div>
      <ModalWithForm buttonText='Add garment' title='New garment' activeModal={activeModal} closeActiveModal={closeActiveModal} isOpen={activeModal === "add-garment"}>
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
      </ModalWithForm>
      <ItemModal activeModal={activeModal} selectedCard={selectedCard} closeActiveModal={closeActiveModal}/>
    </div>
  )
}

export default App
