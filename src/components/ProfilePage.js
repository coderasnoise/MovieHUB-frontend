import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfilePage = ({ user }) => {
    const [favorites, setFavorites] = useState([]);
    const [password, setPassword] = useState('');

    useEffect(() => {
        const fetchFavorites = async () => {
            const response = await axios.get(`http://localhost:5000/favorites/${user.id}`);
            setFavorites(response.data);
        };

        fetchFavorites();
    }, [user.id]);

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:5000/users/${user.id}/change-password`, { new_password: password });
            alert('Password updated successfully!');
        } catch (error) {
            alert('Failed to update password!');
        }
    };

    return (
        <div>
            <h1>Profile Page</h1>
            <h2>Welcome, {user.username}!</h2>

            <div>
                <h3>Your Favorites</h3>
                <ul>
                    {favorites.map(fav => <li key={fav.id}>{fav.title}</li>)}
                </ul>
            </div>

            <div>
                <h3>Change Password</h3>
                <form onSubmit={handlePasswordChange}>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="New password" />
                    <button type="submit">Update Password</button>
                </form>
            </div>
        </div>
    );
};

export default ProfilePage;
