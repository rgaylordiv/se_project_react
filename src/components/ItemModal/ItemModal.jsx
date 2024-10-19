import './ItemModal.css'
import { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function ItemModal({ activeModal, selectedCard, closeActiveModal, handleDeleteItem }){

    const handleDeleteClick = () => {
         console.log(selectedCard._id);
         handleDeleteItem(selectedCard._id);
     }

     const { currentUser } = useContext(CurrentUserContext);

     const isOwn = selectedCard.owner === currentUser._id;

     const itemDeleteButtonClassName = (
        `item__delete-button ${isOwn ? 'item__delete-button_visible' : 'item__delete-button_hidden'}`
     )

    return(
        <div className={`modal ${activeModal === 'preview' ? 'modal_opened' : ''}`} id='image'>
            <div className='modal__container modal__container_type_image'>
                <button aria-label='Close' onClick={closeActiveModal} className='modal__close'></button>
                <img src={selectedCard.imageUrl} alt='Image' className='modal__image'/>
                <div className='modal__footer'>
                    <div className='modal__delete'>
                        <h2 className='modal__caption'>{selectedCard.name}</h2>
                        {isOwn ? (
                            <button className={itemDeleteButtonClassName} type='submit' onClick={() => handleDeleteClick(selectedCard._id)}>
                                Delete Item
                            </button>
                        ) : (
                            ''
                        )}
                    </div>
                    <p className='modal__weather'>Weather: {selectedCard.weather}</p>
                </div>
            </div>

        </div>
    )
}

export default ItemModal;