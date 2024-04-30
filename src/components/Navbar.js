import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/Navbar.css';  // Stiller için CSS dosyası
import SearchBar from './SearchBar';

const Navbar = ({ user }) => {
    return (
        <nav className="navbar">
            <Link to="/" className="navbar-logo">
                MovieHub
            </Link>

            <ul className="nav-links">
                {user ? (
                    <>
                        <SearchBar onSearch={(term) => console.log(term)} />
                        <li><Link to="/profile">Profile</Link></li>
                        <li>
                            <button /*onClick={/* logout function }*/>
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
