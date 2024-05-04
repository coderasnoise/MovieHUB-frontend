// src/context/AuthContext.js
import React, {createContext, useContext, useEffect, useState} from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        if (token) {
            const decoded = jwtDecode(token);  // Fonksiyonu doğru kullanım
            setUserId(decoded.user_id);
        }
    }, [token, userId]);


    const login = (newToken) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, login, logout, userId }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
