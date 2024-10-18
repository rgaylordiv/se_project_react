import React from "react";
import { useState, useEffect } from 'react';
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import './LoginModal.css';

function LoginModal({ isOpen, closeActiveModal, activeModal, handleAuthorization, handleNavigationToRegister }){
    const [data, setData] = useState({
        email: '',
        password: '',
    });
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // const handleEmail = (evt) => {
    //     console.log(evt.target.value);
    //     setEmail(evt.target.value);
    // }

    // const handlePassword = (evt) => {
    //     console.log(evt.target.value);
    //     setPassword(evt.target.value);
    // }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        handleAuthorization(data);
    }

    const resetForm = () => {
        setData({
            email: '',
            password: '',
        });
    }

    useEffect(() => {
        if(isOpen){
          resetForm();
        }
      }, [isOpen]);

    //^^ these two need to be reconfigured to not get an error

    return(
        <ModalWithForm buttonText='Log In' title='Log In' activeModal={activeModal} closeActiveModal={closeActiveModal} isOpen={isOpen} onSubmit={handleSubmit}>
            <label className='modal__form-group' htmlFor='email' id='modal-email'>
                <span className='modal__form-title'>Email</span>
                <input type='text' placeholder='Email' className='modal__form-input' name='email' id='email' onChange={handleChange} value={data.email}/>
                <span className='modal__input-error'></span>
            </label>
            <label className='modal__form-group' htmlFor='password' id='modal-password'>
                <span className='modal__form-title'>Password</span>
                <input type='password' placeholder='Password' className='modal__form-input' name='password' id='password' onChange={handleChange} value={data.password}/>
                <span className='modal__input-error'></span>
            </label>
            <button className="button__signup" onClick={handleNavigationToRegister}>or Sign Up</button>
        </ModalWithForm>
    )
}

export default LoginModal;