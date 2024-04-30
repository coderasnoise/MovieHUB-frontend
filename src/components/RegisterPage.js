import '../assets/AuthForm.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/register', { username, email, password });
            alert('Registration successful!');
            history.push('/login');  // Giriş sayfasına yönlendir
        } catch (error) {
            console.error('Registration failed:', error);
            alert('Registration failed, please try again!');
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <label>
                    Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegisterPage;
