import React, { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import { motion } from 'framer-motion';
import logo from './assets/news.png';
import ThemeToggle from './ThemeToggle';
import './Navbar.css';

const Navbar = () => {
    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);

    // Sticky header shrink on scroll
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Check if current path matches the link
    const isActive = (path) => {
        if (path === '/') {
            return location.pathname === '/';
        }
        return location.pathname.startsWith(path);
    };

    return (
        <motion.nav
            className={`navbar fixed-top navbar-expand-lg glass-navbar navbar-shrink ${isScrolled ? 'scrolled' : ''}`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
            <div className="container-fluid">
                {/* Logo */}
                <Link className="navbar-brand" to="/">
                    <motion.img
                        src={logo}
                        alt='NewsTempo'
                        animate={{
                            height: isScrolled ? 35 : 45,
                            transition: { duration: 0.3 }
                        }}
                    />
                </Link>

                {/* Mobile Toggle */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navigation Links */}
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${isActive('/') && location.pathname === '/' ? 'active' : ''}`}
                                to="/"
                            >
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${isActive('/business') ? 'active' : ''}`}
                                to="/business"
                            >
                                Business
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${isActive('/technology') ? 'active' : ''}`}
                                to="/technology"
                            >
                                Technology
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${isActive('/health') ? 'active' : ''}`}
                                to="/health"
                            >
                                Health
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${isActive('/science') ? 'active' : ''}`}
                                to="/science"
                            >
                                Science
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${isActive('/sports') ? 'active' : ''}`}
                                to="/sports"
                            >
                                Sports
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${isActive('/entertainment') ? 'active' : ''}`}
                                to="/entertainment"
                            >
                                Entertainment
                            </Link>
                        </li>
                        <li className="nav-item nav-item-saved">
                            <Link
                                className={`nav-link nav-link-saved ${isActive('/saved') ? 'active' : ''}`}
                                to="/saved"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                                </svg>
                                Saved
                            </Link>
                        </li>
                    </ul>

                    {/* Search */}
                    <form className="d-flex search-form" role="search" onSubmit={(e) => e.preventDefault()}>
                        <div className="search-input-wrapper">
                            <input
                                className="form-control search-input"
                                type="search"
                                placeholder="Search news..."
                                aria-label="Search"
                            />
                            <button className="search-btn" type="submit" aria-label="Search">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <path d="M21 21l-4.35-4.35"></path>
                                </svg>
                            </button>
                        </div>
                    </form>

                    {/* Theme Toggle */}
                    <ThemeToggle />
                </div>
            </div>
        </motion.nav>
    )
}

export default Navbar;
