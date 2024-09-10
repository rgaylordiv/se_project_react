import React from "react";
import { useState } from 'react';
import './AddItemModal.css';
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function AddItemModal({ isOpen, closeActiveModal, onAddItem, activeModal }){
    const [name, setName] = useState('');
    const [link, setImage] = useState('');
    const [weather, setWeather] = useState('');
    
    const handleNameChange = (evt) => {
        console.log(evt.target.value);
        setName(evt.target.value);
    }

    const handleImageChange = (evt) => {
        console.log(evt.target.value);
        setImage(evt.target.value);
    }

    const handleWeatherConditionChange = (evt) => {
        console.log(evt.target.value);
        setWeather(evt.target.value);
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        onAddItem({name, link, weather});

        setName('');
        setImage('');
        setWeather('')
    }

    return(
        <ModalWithForm buttonText='Add garment' title='New garment' activeModal={activeModal} closeActiveModal={closeActiveModal} isOpen={isOpen} onSubmit={handleSubmit}>
        <label className='modal__form-group' htmlFor='name' id='modal-name'>
          <span className='modal__form-title'>Name</span>
          <input type='text' placeholder='Name' className='modal__form-input' name='name' id='name' onChange={handleNameChange} value={name}/>
          <span className='modal__input-error'></span>
        </label>
        <label className='modal__form-group' htmlFor='imageURL'>
          <span className='modal__form-title'>Image</span>
          <input type="url" placeholder="Image URL" id='imageURL' className="modal__form-input modal__input_type_url" name="image" onChange={handleImageChange} value={link}/>
          <span className="modal__input-error" id="post-image-url-input-error"></span>
        </label>
        <fieldset className='modal__radio-buttons'>
          <legend className='modal__legend'>Select the weather type:</legend>
          <label className='modal__label modal__label_type_radio' htmlFor='hot' id='radio-button'>
            <input type='radio' name='weather' className='modal__radio-input' id='hot' onChange={handleWeatherConditionChange} value='Hot' checked={weather === 'Hot'}/> Hot
          </label>
          <label className='modal__label modal__label_type_radio' htmlFor='warm' id='radio-button'>
            <input type='radio' name='weather' className='modal__radio-input' id='warm' onChange={handleWeatherConditionChange} value='Warm' checked={weather === 'Warm'}/> Warm
          </label>
          <label className='modal__label modal__label_type_radio' htmlFor='cold' id='radio-button'>
            <input type='radio' name='weather' className='modal__radio-input' id='cold' onChange={handleWeatherConditionChange} value="Cold" checked={weather === 'Cold'}/> Cold
          </label>
        </fieldset>
        </ModalWithForm>
    )
}

export default AddItemModal;