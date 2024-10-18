import './ItemCard.css'
// import likeButton from '../../assets/likeButton.svg';

function ItemCard({ item, handleCardClick, onCardLike }){
    const onCardClick = () =>{
        handleCardClick(item)
    }

    const handleLike = () => {
        onCardLike(item);
    }
    
    return(
        <div className='item-card'>
            <div className='item-card__items'>
                <h2 className='item-card__name'>{item.name}</h2>
                <button className='item-card__button' onClick={handleLike}></button>
            </div>
            <img 
                src={item.link} 
                alt={item.name} 
                className='item-card__image'
                onClick={onCardClick}
            />
        </div>
    )
}

export default ItemCard;