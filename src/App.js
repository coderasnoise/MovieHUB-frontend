
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import ContentGrid from './components/ContentGrid';


function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = () => setIsAuthenticated(true);
    const logout = () => setIsAuthenticated(false);
    return (
        <Router>
            <Navbar user={isAuthenticated} logout={logout}/>
            <HomePage></HomePage>
            <Routes >
                <Route path="/login" element={<LoginPage login={login} />} />
                <Route path="/" element={<LandingPage isAuthenticated={isAuthenticated} />} />
                {/* Diğer rotalar burada */}
            </Routes >
        </Router>
    );
}

export default App;
