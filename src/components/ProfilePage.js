import React, {useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import {useAuth} from "../context/AuthContext";
import '../assets/ProfilePage.css';

function UserProfile() {
    const [user, setUser] = useState({ email: '', name: '' });
    const [favorites, setFavorites] = useState([]);
    const { token, userId } = useAuth();  // useAuth'dan userId'yi de al

    // fetchUserProfile fonksiyonunu useCallback ile sarmala
    const fetchUserProfile = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:5000/user/${userId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setUser({ email: response.data.email, name: response.data.name });
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching user profile:', error.response ? error.response.data : error.message);
        }
    }, [userId, token]);  // Bağımlılıklar

    // fetchFavorites fonksiyonunu useCallback ile sarmala
    const fetchFavorites = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:5000/favorites/${userId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setFavorites(response.data);
            console.log(response.data);
        } catch (error) {

        }
    }, [userId, token]);  // Bağımlılıklar

    // useEffect kullanarak fonksiyonları çağır
    useEffect(() => {
        fetchUserProfile();
        fetchFavorites();
    }, [fetchUserProfile, fetchFavorites]);  // Bağımlılıkları güncelle


    const updateUserProfile = async () => {
        try {
            const response = await axios.put(`http://localhost:5000/user/${userId}`, {
                email: user.email,
                name: user.name
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log('Profile updated successfully:', response.data);
        } catch (error) {
            console.error('Error updating profile:', error.response.data);
        }
    };

    return (
        <div className="user-profile-container">
            <h2>Profilim</h2>
            <div>
                <label className="label">Email:</label>
                <input
                    className="input"
                    value={user.email}
                    onChange={e => setUser({...user, email: e.target.value})}
                    placeholder="Email"
                />
                <label className="label">Name:</label>
                <input
                    className="input"
                    value={user.name}
                    onChange={e => setUser({...user, name: e.target.value})}
                    placeholder="Name"
                />
                <button className="button" onClick={updateUserProfile}>Update Profile</button>
            </div>
            <h3>Favorites</h3>
            <ul className="favorites-list">
                {favorites.map(fav => (
                    <li key={fav.favorite_id}>{fav.content_title}</li>
                ))}
            </ul>
        </div>
    );
}

export default UserProfile;
