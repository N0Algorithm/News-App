import React, { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import { motion } from 'framer-motion';
import logo from './assets/news.png';
import ThemeToggle from './ThemeToggle';
import './Navbar.css';

const Navbar = () => {
    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [currentDate, setCurrentDate] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Sticky header shrink on scroll
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Update date/time every minute
    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            setCurrentDate(now.toLocaleDateString('en-US', options));
        };

        updateDateTime();
        const interval = setInterval(updateDateTime, 60000); // Update every minute

        return () => clearInterval(interval);
    }, []);

    // Close menu when location changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    // Check if current path matches the link
    const isActive = (path) => {
        if (path === '/') {
            return location.pathname === '/';
        }
        return location.pathname.startsWith(path);
    };

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/business', label: 'Business' },
        { path: '/technology', label: 'Technology' },
        { path: '/health', label: 'Health' },
        { path: '/science', label: 'Science' },
        { path: '/sports', label: 'Sports' },
        { path: '/entertainment', label: 'Entertainment' },
    ];

    return (
        <motion.nav
            className={`navbar fixed-top glass-navbar ${isScrolled ? 'scrolled' : ''}`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
            <div className="container-fluid nav-container">
                {/* Logo */}
                <Link className="navbar-brand" to="/" onClick={() => setIsMenuOpen(false)}>
                    <motion.img
                        src={logo}
                        alt='AkNews'
                        className="navbar-logo"
                        animate={{
                            height: isScrolled ? 35 : 45,
                            transition: { duration: 0.3 }
                        }}
                    />
                </Link>

                {/* Desktop Navigation Links */}
                <div className="d-none d-lg-flex align-items-center flex-grow-1">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 flex-row gap-4 ms-4">
                        {navLinks.map((link) => (
                            <li key={link.path} className="nav-item">
                                <Link
                                    className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
                                    to={link.path}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 flex-row gap-4 align-items-center">
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${isActive('/saved') ? 'active' : ''}`}
                                to="/saved"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '4px', verticalAlign: 'middle' }}>
                                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                                </svg>
                                Saved
                            </Link>
                        </li>
                        <li className="nav-item d-none d-xl-block">
                            <div className="navbar-datetime">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polyline points="12 6 12 12 16 14"></polyline>
                                </svg>
                                <span>{currentDate}</span>
                            </div>
                        </li>
                        <li className="nav-item">
                            <ThemeToggle />
                        </li>
                    </ul>
                </div>

                {/* Mobile Icons & Toggle */}
                <div className="d-flex d-lg-none align-items-center gap-2">
                    <ThemeToggle />
                    <button
                        className={`hamburger-toggle ${isMenuOpen ? 'open' : ''}`}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle navigation"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>

                {/* Mobile Menu Overlay */}
                <motion.div
                    className="mobile-menu-overlay"
                    initial={false}
                    animate={isMenuOpen ? "open" : "closed"}
                    variants={{
                        open: { x: 0, opacity: 1, visibility: 'visible' },
                        closed: { x: '100%', opacity: 0, transitionEnd: { visibility: 'hidden' } }
                    }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                >
                    <div className="mobile-menu-content">
                        <ul className="mobile-nav-list">
                            {navLinks.map((link, i) => (
                                <motion.li
                                    key={link.path}
                                    variants={{
                                        open: { y: 0, opacity: 1, transition: { delay: i * 0.05 } },
                                        closed: { y: 20, opacity: 0 }
                                    }}
                                >
                                    <Link
                                        className={`mobile-nav-link ${isActive(link.path) ? 'active' : ''}`}
                                        to={link.path}
                                    >
                                        {link.label}
                                    </Link>
                                </motion.li>
                            ))}
                            <motion.li
                                variants={{
                                    open: { y: 0, opacity: 1, transition: { delay: navLinks.length * 0.05 } },
                                    closed: { y: 20, opacity: 0 }
                                }}
                            >
                                <Link
                                    className={`mobile-nav-link mobile-link-saved ${isActive('/saved') ? 'active' : ''}`}
                                    to="/saved"
                                >
                                    Saved Articles
                                </Link>
                            </motion.li>
                        </ul>
                        <div className="mobile-menu-footer">
                            <div className="navbar-datetime">
                                <span>{currentDate}</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
