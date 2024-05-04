// src/components/LandingPage.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';  // Context'i import edin
import ContentGrid from './ContentGrid';
import '../assets/LandingPage.css'

const LandingPage = () => {
    const { token } = useAuth();
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div>
            <ContentGrid/>
        </div>
    );
};

export default LandingPage;
