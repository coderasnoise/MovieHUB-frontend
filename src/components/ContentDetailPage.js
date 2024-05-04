import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactPlayer from 'react-player';
import { useAuth } from '../context/AuthContext';
import '../assets/ContentDetail.css';
import FavoriteButton from './FavoriteButton';
import '../assets/FavoriteButton.css'


const ContentDetailPage = () => {
    const { contentId } = useParams();
    const [content, setContent] = useState(null);
    const [isFavorited, setIsFavorited] = useState(false);
    const { token, userId } = useAuth();  // useAuth'dan userId'yi de al
    const [favoriteId, setFavoriteId] = useState(null);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/contents/${contentId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setContent(response.data);
                setIsFavorited(response.data.isFavorited); // API'den isFavorited bilgisini ayarlama
                setFavoriteId(response.data.favoriteId); // API'den favoriteId bilgisini ayarlama
            } catch (error) {
                console.error('Error fetching content:', error);
            }
        };
        fetchContent();
    }, [contentId, token]); // favoriteId'i bağımlılıklardan çıkar

    const toggleFavorite = async () => {
        if (isFavorited) {
            if (!favoriteId) {
                console.error('Error: No favoriteId provided for removing from favorites');
                alert('No favoriteId provided for removing from favorites');
                return;  // Eğer favoriteId tanımlı değilse, işlemi durdur.
            }
            try {
                const response = await axios.delete(`http://localhost:5000/favorites/${favoriteId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
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
                console.log(response.data);
                if (response.data.id === favoriteId) {
                    setIsFavorited(true);
                    setFavoriteId(response.data[0].favorite_id); // POST isteğinden dönen favorite_id ile güncelle

                } else {
                    console.error('No favorite_id returned from the server.');
                    alert('Failed to add to favorites. Please try again.');
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
            <ReactPlayer url={content.videoUrl} controls />
            <p>{content.description}</p>
            <FavoriteButton isFavorited={isFavorited} toggleFavorite={toggleFavorite} />
        </div>
    );
};

export default ContentDetailPage;
