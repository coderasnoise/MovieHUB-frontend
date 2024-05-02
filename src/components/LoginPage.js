import '../assets/AuthForm.css'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ login }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        login({ username });
        navigate('/home', { replace: true });
    };

    return (
        <div className="auth-form-container">
            <form className="auth-form" onSubmit={handleLogin}>
                <h2>Giriş yap</h2>
                <label htmlFor="username">Kullanıcı Adı:</label>
                <input type="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required/>
                <label htmlFor="password">Şifre:</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}
                       required/>
                <button type="submit">Login</button>
            </form>
        </div>

    );
};

export default LoginPage;
