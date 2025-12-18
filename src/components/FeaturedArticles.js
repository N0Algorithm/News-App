import React from 'react';
import ArticleCard from './ArticleCard';
import './FeaturedArticles.css';

/**
 * FeaturedArticles Component
 * Displays a grid of 4 featured articles
 */
const FeaturedArticles = ({ articles, title = "Featured Stories" }) => {
    if (!articles || articles.length === 0) {
        return null;
    }

    return (
        <section className="featured-section">
            <div className="featured-container">
                <div className="section-header">
                    <h2 className="section-title">{title}</h2>
                </div>
                <div className="featured-grid">
                    {articles.slice(0, 4).map((article, index) => (
                        <ArticleCard
                            key={article.article_id || index}
                            article={article}
                            variant="featured"
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedArticles;
