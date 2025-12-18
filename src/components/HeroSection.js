import React from 'react';
import ArticleCard from './ArticleCard';
import './HeroSection.css';

/**
 * HeroSection Component
 * Displays the top story as a full-width hero
 */
const HeroSection = ({ article }) => {
    if (!article) {
        return (
            <section className="hero-section hero-section-loading">
                <div className="hero-skeleton">
                    <div className="skeleton skeleton-image"></div>
                </div>
            </section>
        );
    }

    return (
        <section className="hero-section">
            <div className="hero-container">
                <ArticleCard article={article} variant="hero" />
            </div>
        </section>
    );
};

export default HeroSection;
