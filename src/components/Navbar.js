import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../assets/Navbar.css';
import SearchBar from './SearchBar';

const Navbar = () => {
    const { token, logout } = useAuth();

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
                            <button onClick={() => { logout(); }}>
                                Logout
                            </button>
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
