// src/components/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import '../assets/AuthForm.css';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth(); // AuthContext'ten login fonksiyonunu kullan

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', {
                username,
                password
            });
            console.log(response.data);
            const token = response.data.token;
            if (token) {
                console.log("Token received:", token);
                login(token);
                console.log("Navigating to home");
                navigate('/home', { replace: true });
            } else {
                console.log("Login failed: No token received");
                alert('Giriş başarısız, bilgilerinizi kontrol edin.');
            }
        } catch (error) {
            console.error('Giriş işlemi başarısız:', error);
            alert('Giriş işlemi sırasında bir hata oluştu.');
        }
    };

    return (
        <div className="auth-form-container">
            <form className="auth-form" onSubmit={handleLogin}>
                <h2>Giriş yap</h2>
                <label htmlFor="username">Kullanıcı Adı:</label>
                <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                <label htmlFor="password">Şifre:</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;
