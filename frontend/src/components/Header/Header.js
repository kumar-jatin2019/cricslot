// src/components/Header/Header.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './Header.css';

const Header = ({ role, profilePicture, userName }) => {
    console.log(userName, "userName");
    // const { loading, isAuthenticated, user, error } = useSelector((state) => state.auth.user);
    // console.log(user, "user");
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const toggleProfileMenu = () => {
        setProfileMenuOpen(!profileMenuOpen);
    };

    return (
        <header className="header">
            <div className="header-container">
                <div className="logo">
                    <Link to="/">YourApp</Link>
                </div>
                <div className="mobile-menu-icon" onClick={toggleMenu}>
                    <i className="fas fa-bars"></i>
                </div>
                <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
                    <ul>
                        {role === 'admin' ? (
                            <>
                                <li><Link to="/admin/dashboard">Admin Dashboard</Link></li>
                                <li><Link to="/admin/manage-grounds">Manage Grounds</Link></li>
                                <li><Link to="/admin/manage-users">Manage Users</Link></li>
                            </>
                        ) : (
                            <>
                                <li><Link to="/user/dashboard">User Dashboard</Link></li>
                                <li><Link to="/user/book-ground">Book Ground</Link></li>
                                <li><Link to="/user/my-bookings">My Bookings</Link></li>
                            </>
                        )}
                        <li><button onClick={handleLogout}>Logout</button></li>
                    </ul>
                </nav>
                <div className="header__profile" onClick={toggleProfileMenu}>
                    <img src={profilePicture} alt="Profile" className="profile__image" />
                    <span className="profile__name">{userName}</span>
                    <div className={`profile__menu ${profileMenuOpen ? 'open' : ''}`}>
                        <ul>
                            <li><Link to="/profile">View Profile</Link></li>
                            <li><Link to="/settings">Settings</Link></li>
                            <li><button onClick={handleLogout}>Logout</button></li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
