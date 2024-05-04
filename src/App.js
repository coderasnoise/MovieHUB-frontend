// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import RegisterPage from "./components/RegisterPage";
import UserProfile from "./components/ProfilePage";
import ContentDetailPage from "./components/ContentDetailPage";

function App() {
    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/home" element={<LandingPage />} />
                    <Route path="/profile" element={<UserProfile />} />
                    <Route path="/contents/:contentId" element={<ContentDetailPage />}/>
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
