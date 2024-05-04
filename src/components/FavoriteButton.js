// src/components/FavoriteButton.js
import '../assets/FavoriteButton.css'
import React from 'react';

const FavoriteButton = ({ isFavorited, toggleFavorite }) => {
    return (
        <button className='favorite-button' onClick={toggleFavorite}>
            {isFavorited ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
    );
};

export default FavoriteButton;
