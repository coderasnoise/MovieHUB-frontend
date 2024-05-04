// src/components/RegisterPage.js
import '../assets/AuthForm.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:5000/register', { username, email, password });
            alert('Registration successful!');
            history.push('/login');  // Giriş sayfasına yönlendir
        } catch (error) {

        }
    };

    return (
        <div className="auth-form-container">

            <form className="auth-form" onSubmit={handleSubmit}>
                <h2>Kayıt ol</h2>
                <label>
                    Kullanıcı Adı:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                </label>
                <label>
                    Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </label>
                <label>
                    Şifre:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </label>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegisterPage;
