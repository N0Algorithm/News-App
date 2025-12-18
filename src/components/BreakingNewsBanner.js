import React from 'react';
import './BreakingNewsBanner.css';

/**
 * BreakingNewsBanner Component
 * Animated ticker for breaking news
 */
const BreakingNewsBanner = ({ articles }) => {
    if (!articles || articles.length === 0) {
        return null;
    }

    // Combine titles for the ticker
    const tickerText = articles
        .slice(0, 5)
        .map(article => article.title)
        .join('  •  ');

    return (
        <div className="breaking-banner" role="alert" aria-live="polite">
            <div className="breaking-label">
                <span className="breaking-dot"></span>
                <span>Breaking</span>
            </div>
            <div className="breaking-ticker-wrapper">
                <div className="breaking-ticker">
                    <span className="ticker-text">{tickerText}</span>
                    <span className="ticker-text" aria-hidden="true">{tickerText}</span>
                </div>
            </div>
        </div>
    );
};

export default BreakingNewsBanner;
