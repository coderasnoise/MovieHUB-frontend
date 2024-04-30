// src/components/LandingPage.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import ContentGrid from './ContentGrid';

const LandingPage = ({ isAuthenticated }) => {
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div>
            <h1>Welcome to MovieHub!</h1>
            <ContentGrid />
        </div>
    );
};

export default LandingPage;
