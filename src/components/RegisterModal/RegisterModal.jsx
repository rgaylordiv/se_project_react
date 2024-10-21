import React from "react";
import { useState, useEffect } from 'react';
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import './RegisterModal.css';

function RegisterModal({ isOpen, closeActiveModal, activeModal, handleRegistration, handleNavigationToLogin, isLoading }){
    const [data, setData] = useState({
        name: '',
        avatar: '',
        email: '',
        password: '',
    });
    // const [name, setName] = useState('');
    // const [avatar, setAvatar] = useState('');
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');

    // const handleName = (evt) => {
    //     console.log(evt.target.value);
    //     setName(evt.target.value);
    // }

    // const handleEmail = (evt) => {
    //     console.log(evt.target.value);
    //     setEmail(evt.target.value);
    // }

    // const handlePassword = (evt) => {
    //     console.log(evt.target.value);
    //     setPassword(evt.target.value);
    // }

    // const handleAvatar = (evt) => {
    //     console.log(evt.target.value);
    //     setAvatar(evt.target.value);
    // }

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        handleRegistration(data);
    }

    const resetForm = () => {
        setData({
            name: '',
            avatar: '',
            email: '',
            password: '',
        });
    }

    useEffect(() => {
        if(isOpen){
          resetForm();
        }
      }, [isOpen]);

    return(
        <ModalWithForm buttonText={isLoading ? 'Signing up...' : 'Sign up'} title='Sign Up' activeModal={activeModal} closeActiveModal={closeActiveModal} isOpen={isOpen} onSubmit={handleSubmit}>
            <label className='modal__form-group' htmlFor='email' id='modal-email'>
                <span className='modal__form-title'>Email*</span>
                <input type='text' placeholder='Email' className='modal__form-input' name='email' id='register-email' onChange={handleChange} value={data.email}/>
                <span className='modal__input-error'></span>
            </label>
            <label className='modal__form-group' htmlFor='password' id='modal-password'>
                <span className='modal__form-title'>Password*</span>
                <input type='password' placeholder='Password' className='modal__form-input' name='password' id='register-password' onChange={handleChange} value={data.password}/>
                <span className='modal__input-error'></span>
            </label>
            <label className='modal__form-group' htmlFor='name' id='modal-name'>
                <span className='modal__form-title'>Name*</span>
                <input type='text' placeholder='Name' className='modal__form-input' name='name' id='register-name' onChange={handleChange} value={data.name}/>
                <span className='modal__input-error'></span>
            </label>
            <label className='modal__form-group' htmlFor='avatar'>
                <span className='modal__form-title'>Avatar URL*</span>
                <input type="url" placeholder="Avatar URL" id='register-avatar' className="modal__form-input modal__input_type_url" name="avatar" onChange={handleChange} value={data.avatar}/>
                <span className="modal__input-error" id="post-image-url-input-error"></span>
            </label>
            <button className="button__login" onClick={handleNavigationToLogin}>or Log in</button>
        </ModalWithForm>
    )
}

export default RegisterModal;