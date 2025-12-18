import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container-custom">
                <div className="footer-content">
                    <div className="footer-section brand-section">
                        <h2 className="footer-brand">NewsApp</h2>
                        <p className="footer-tagline">Stay informed with the latest news and stories from around the world.</p>
                        <div className="footer-social">
                            <a href="#" className="social-link" aria-label="Facebook">fb</a>
                            <a href="#" className="social-link" aria-label="Twitter">tw</a>
                            <a href="#" className="social-link" aria-label="LinkedIn">in</a>
                        </div>
                    </div>

                    <div className="footer-section links-section">
                        <h3 className="footer-heading">Categories</h3>
                        <ul className="footer-links">
                            <li><Link to="/business">Business</Link></li>
                            <li><Link to="/technology">Technology</Link></li>
                            <li><Link to="/science">Science</Link></li>
                            <li><Link to="/sports">Sports</Link></li>
                        </ul>
                    </div>

                    <div className="footer-section links-section">
                        <h3 className="footer-heading">Support</h3>
                        <ul className="footer-links">
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                            <li><Link to="/privacy">Privacy Policy</Link></li>
                            <li><Link to="/terms">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} NewsApp. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
