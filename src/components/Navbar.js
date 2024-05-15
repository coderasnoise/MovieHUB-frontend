import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../assets/Navbar.css';
import SearchBar from './SearchBar';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { token, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); // Oturumu sonlandır
        navigate('/login'); // Kullanıcıyı login sayfasına yönlendir
    };


    return (
        <nav className="navbar">
            <Link to={token ? "/home" : "/"} className="navbar-logo">
                MovieHub
            </Link>
            <ul className="nav-links">
                {token ? (
                    <>
                        <SearchBar onSearch={(term) => console.log(term)} />
                        <li><Link to="/profile">Profile</Link></li>
                        <li>
                            <button onClick={handleLogout}>Logout</button>
                        </li>
                    </>
                ) : (
                    <>
                        <li><Link to="/login">Giriş Yap</Link></li>
                        <li><Link to="/register">Kayıt Ol</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
