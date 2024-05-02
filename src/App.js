import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import ContentGrid from './components/ContentGrid';
import RegisterPage from "./components/RegisterPage";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = () => setIsAuthenticated(true);
    const logout = () => {
        setIsAuthenticated(false);
        return <Route to="/login" />
    };
    return (
        <Router>
            <Navbar user={isAuthenticated} logout={logout}/>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage login={login} />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/home" element={<LandingPage isAuthenticated={isAuthenticated} />} />
                {/* Diğer rotalar burada */}
            </Routes>
        </Router>
    );
}

export default App;

