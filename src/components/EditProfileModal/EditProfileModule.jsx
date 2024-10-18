import React from "react";
import { useState, useEffect, useContext } from 'react';
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import './EditProfileModule.css';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function EditProfileModule({ isOpen, closeActiveModal, activeModal, handleChange }) {
    const [data, setData] = useState({
        name: '',
        avatar: '',
    })
    const { currentUser } = useContext(CurrentUserContext);

    const handleChanges = (evt) => {
        const { name, value } = evt.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        handleChange(data);
    }

    const resetForm = () => {
        setData({
            name: '',
            avatar: '',
        });
    }

    useEffect(() => {
        if(isOpen){
            resetForm();
        }
    }, [isOpen]);

    useEffect(() => {
        if(currentUser){
            setData({
                name: currentUser?.name || '',
                avatar: currentUser?.avatar || '',
            })
        }
    }, [currentUser]);

    return(
        <ModalWithForm buttonText='Save changes' title='Change profile data' activeModal={activeModal} closeActiveModal={closeActiveModal} isOpen={isOpen} onSubmit={handleSubmit}>
            <label className='modal__form-group' htmlFor='name' id='modal-name'>
                <span className='modal__form-title'>Name *</span>
                <input type='text' placeholder='Name' className='modal__form-input' name='name' id='change-name' onChange={handleChanges} value={data.name}/>
                <span className='modal__input-error'></span>
            </label>
            <label className='modal__form-group' htmlFor='avatar'>
                <span className='modal__form-title'>Avatar *</span>
                <input type="url" placeholder="Avatar URL" id='change-avatar' className="modal__form-input modal__input_type_url" name="avatar" onChange={handleChanges} value={data.avatar}/>
                <span className="modal__input-error" id="post-image-url-input-error"></span>
            </label>
        </ModalWithForm>
    )
}

export default EditProfileModule;