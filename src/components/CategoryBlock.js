import React from 'react';
import ArticleCard from './ArticleCard';
import './CategoryBlock.css';

/**
 * CategoryBlock Component
 * Displays a group of articles under a category header
 */
const CategoryBlock = ({
    category,
    articles,
    viewAll = true,
    maxArticles = 4,
    variant = 'grid' // 'grid' | 'list' | 'scroll'
}) => {
    if (!articles || articles.length === 0) {
        return null;
    }

    const displayArticles = articles.slice(0, maxArticles);
    const categorySlug = category.toLowerCase().replace(/\s+/g, '-');

    return (
        <section className="category-block" id={`category-${categorySlug}`}>
            <div className="category-container">
                <div className="category-header">
                    <div className="category-header-left">
                        <span className={`category-indicator category-${categorySlug}`}></span>
                        <h2 className="category-title">{category}</h2>
                    </div>
                    {viewAll && (
                        <a href={`/${categorySlug}`} className="category-view-all">
                            View All →
                        </a>
                    )}
                </div>

                <div className={`category-articles category-${variant}`}>
                    {variant === 'list' ? (
                        // List layout - compact cards
                        displayArticles.map((article, index) => (
                            <ArticleCard
                                key={article.article_id || index}
                                article={article}
                                variant="compact"
                                showExcerpt={false}
                            />
                        ))
                    ) : variant === 'scroll' ? (
                        // Horizontal scroll layout
                        <div className="category-scroll-wrapper">
                            {displayArticles.map((article, index) => (
                                <div className="category-scroll-item" key={article.article_id || index}>
                                    <ArticleCard
                                        article={article}
                                        variant="featured"
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        // Grid layout (default)
                        displayArticles.map((article, index) => (
                            <ArticleCard
                                key={article.article_id || index}
                                article={article}
                                variant="default"
                            />
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

export default CategoryBlock;
