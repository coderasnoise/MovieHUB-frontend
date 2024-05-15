import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactPlayer from 'react-player';
import { useAuth } from '../context/AuthContext';
import '../assets/ContentDetail.css';
import FavoriteButton from './FavoriteButton';
import '../assets/FavoriteButton.css';

const ContentDetailPage = () => {
    const { contentId } = useParams();
    const [content, setContent] = useState(null);
    const [isFavorited, setIsFavorited] = useState(false);
    const { token, userId } = useAuth();
    const [favoriteId, setFavoriteId] = useState(null);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const contentResponse = await axios.get(`http://localhost:5000/contents/${contentId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setContent(contentResponse.data);

                const favoritesResponse = await axios.get(`http://localhost:5000/favorites/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const favorite = favoritesResponse.data.find(fav => fav.content_id === parseInt(contentId));
                if (favorite) {
                    setIsFavorited(true);
                    setFavoriteId(favorite.favorite_id);
                }
            } catch (error) {
                console.error('Error fetching content or favorites:', error);
            }
        };
        fetchContent();
    }, [contentId, userId, token]);

    const toggleFavorite = async () => {
        if (isFavorited) {
            if (!favoriteId) {
                console.error('Error: No favoriteId provided for removing from favorites');
                alert('No favoriteId provided for removing from favorites');
                return;
            }
            try {
                const response = await axios.delete(`http://localhost:5000/favorites/${favoriteId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setIsFavorited(response.data.isFavorited);
                setFavoriteId(response.data.favoriteId);
                console.log('Favorite deleted successfully:', response.data);
            } catch (error) {
                console.error('Error removing favorite:', error);
            }
        } else {
            try {
                const response = await axios.post('http://localhost:5000/favorites', {
                    user_id: userId,
                    content_id: contentId,
                    content_type: 'movie'
                }, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (response.data.id === favoriteId) {
                    setIsFavorited(true);
                    setFavoriteId(response.data[0].favorite_id);

                } else {
                    console.error('No favorite_id returned from the server.');
                }
            } catch (error) {
                console.error('Error adding to favorites:', error);
                alert('Error adding to favorites');
            }
        }
    };

    if (!content) {
        return <div>Loading...</div>;
    }

    return (
        <div className="content-detail">
            <h1>{content.title}</h1>
            {content.video_url ? (
                <ReactPlayer url={content.video_url} controls />
            ) : (
                <p>Video URL not available</p>
            )}
            <p>{content.description}</p>
            <FavoriteButton isFavorited={isFavorited} toggleFavorite={toggleFavorite} />
        </div>
    );
};

export default ContentDetailPage;
