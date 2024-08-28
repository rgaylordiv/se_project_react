import './ModalWithForm.css'

function ModalWithForm({ children, buttonText, title, activeModal, closeActiveModal }){
    return(
        <>
        <div className={`modal ${activeModal === 'add-garment' ? 'modal_opened' : ''}`}>
            <div className='modal__container'>
                <button aria-label='Close' onClick={closeActiveModal} className='modal__close'></button>
                <h1 className='modal__heading'>{title}</h1>
                <form className='modal__form'>
                    {children}
                    <button className="modal__button" type="submit" id="new-post">{buttonText}</button>
                </form>
            </div>
        </div>
        </>
    )
}

export default ModalWithForm;