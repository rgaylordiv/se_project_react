import { React, useContext } from 'react';
import './ItemCard.css'
import { CurrentUserContext } from '../../contexts/CurrentUserContext';


function ItemCard({ item, handleCardClick, onCardLike }){
    const onCardClick = () =>{
        handleCardClick(item)
    }

    const handleLike = () => {
        onCardLike({ id: item._id, isLiked: isLiked});
    }

    const { currentUser, isLoggedIn } = useContext(CurrentUserContext);
    
    const isLiked = item.likes.some(id => id === currentUser._id)
    const isOwn = item.owner === currentUser._id;
    const itemLikeButtonClassName = (
        `${isLiked ? 'item-card__button-liked' : 'item-card__button'} ${isOwn ? 'item-card__button' : 'item-card__button-hidden'}`
    ) // item-card__button was in front of these js functions

    console.log("Current User ID:", currentUser._id);
    console.log("Item Owner ID:", item.owner);
    console.log("Item Likes:", item.likes);
    
    return(
        <div className='item-card'>
            <div className='item-card__info'>
                <h2 className='item-card__name'>{item.name}</h2>
                {isLoggedIn ? (
                    <button className={itemLikeButtonClassName} onClick={handleLike}></button>
                ) : (
                    ''
                )}
            </div>
            <img 
                src={item.imageUrl} // was link
                alt={item.name} 
                className='item-card__image'
                onClick={onCardClick}
            />
        </div>
    )
}

export default ItemCard;