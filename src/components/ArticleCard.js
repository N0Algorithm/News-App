import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getImageFallback, truncateText, getArticleId, getCategoryBadgeClass, formatDate } from '../utils/newsUtils';
import { cardHover, imageHover, headlineReveal, getReducedMotion } from '../utils/animations';
import BookmarkButton from './BookmarkButton';
import './ArticleCard.css';

/**
 * ArticleCard Component
 * Reusable card with variants and premium animations
 */
const ArticleCard = ({
    article,
    variant = 'default',
    showExcerpt = true,
    showCategory = true,
    showMeta = true,
    showBookmark = true,
    index = 0
}) => {
    const [imageError, setImageError] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const reducedMotion = getReducedMotion();

    if (!article) return null;

    const {
        title,
        description,
        image_url,
        creator,
        pubDate,
        source_id,
        category
    } = article;

    const articleId = getArticleId(article);
    const imageUrl = imageError ? getImageFallback(category?.[0]) : (image_url || getImageFallback(category?.[0]));
    const categoryName = category?.[0] || 'General';
    const author = creator?.[0] || source_id || 'Unknown';

    const handleImageError = () => {
        setImageError(true);
    };

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    // Motion variants
    const cardVariants = reducedMotion ? {} : cardHover;
    const imgVariants = reducedMotion ? {} : imageHover;

    // Hero variant - full width with overlay
    if (variant === 'hero') {
        return (
            <motion.article
                className="article-card article-card-hero animated-card"
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                variants={cardVariants}
            >
                <Link to={`/article/${articleId}`} className="article-card-link" state={{ article }}>
                    <div className="hero-image-container">
                        <div className={`image-blur-wrapper ${imageLoaded ? 'loaded' : ''}`}>
                            <motion.img
                                src={imageUrl}
                                alt={title}
                                className="hero-image"
                                onError={handleImageError}
                                onLoad={handleImageLoad}
                                loading="eager"
                                variants={imgVariants}
                            />
                        </div>
                        <div className="hero-overlay">
                            <motion.div
                                className="hero-content"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                            >
                                {showCategory && (
                                    <span className={`badge ${getCategoryBadgeClass(categoryName)}`}>
                                        {categoryName}
                                    </span>
                                )}
                                <h1 className="hero-title animated-title">{title}</h1>
                                {showExcerpt && description && (
                                    <p className="hero-excerpt">{truncateText(description, 200)}</p>
                                )}
                                {showMeta && (
                                    <div className="hero-meta">
                                        <span className="hero-author">{author}</span>
                                        <span className="hero-date">{formatDate(pubDate, 'relative')}</span>
                                    </div>
                                )}
                            </motion.div>
                        </div>
                    </div>
                </Link>
            </motion.article>
        );
    }

    // Featured variant - medium card with image on top
    if (variant === 'featured') {
        return (
            <motion.article
                className="article-card article-card-featured animated-card card-enter"
                style={{ animationDelay: `${index * 0.08}s` }}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                variants={cardVariants}
            >
                <Link to={`/article/${articleId}`} className="article-card-link" state={{ article }}>
                    <div className="featured-image-container">
                        <div className={`image-blur-wrapper ${imageLoaded ? 'loaded' : ''}`}>
                            <motion.img
                                src={imageUrl}
                                alt={title}
                                className="featured-image"
                                onError={handleImageError}
                                onLoad={handleImageLoad}
                                loading="lazy"
                                variants={imgVariants}
                            />
                        </div>
                        {showCategory && (
                            <span className={`badge badge-floating ${getCategoryBadgeClass(categoryName)}`}>
                                {categoryName}
                            </span>
                        )}
                        {showBookmark && (
                            <div className="card-bookmark-wrapper">
                                <BookmarkButton article={article} size="sm" />
                            </div>
                        )}
                    </div>
                    <div className="featured-body">
                        <h3 className="featured-title animated-title">{truncateText(title, 80)}</h3>
                        {showExcerpt && description && (
                            <p className="featured-excerpt">{truncateText(description, 100)}</p>
                        )}
                        {showMeta && (
                            <div className="featured-meta">
                                <span>{author}</span>
                                <span className="meta-separator">•</span>
                                <span>{formatDate(pubDate, 'relative')}</span>
                            </div>
                        )}
                    </div>
                </Link>
            </motion.article>
        );
    }

    // Compact variant - small card for lists
    if (variant === 'compact') {
        return (
            <motion.article
                className="article-card article-card-compact animated-card"
                initial="rest"
                whileHover="hover"
                variants={cardVariants}
            >
                <Link to={`/article/${articleId}`} className="article-card-link" state={{ article }}>
                    <div className="compact-image-container">
                        <motion.img
                            src={imageUrl}
                            alt={title}
                            className="compact-image"
                            onError={handleImageError}
                            loading="lazy"
                            variants={imgVariants}
                        />
                    </div>
                    <div className="compact-body">
                        <h4 className="compact-title animated-title">{truncateText(title, 60)}</h4>
                        {showMeta && (
                            <div className="compact-meta">
                                <span>{formatDate(pubDate, 'relative')}</span>
                            </div>
                        )}
                    </div>
                </Link>
            </motion.article>
        );
    }

    // Default variant - standard card
    return (
        <motion.article
            className="article-card article-card-default animated-card card-enter"
            style={{ animationDelay: `${index * 0.08}s` }}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            variants={cardVariants}
        >
            <Link to={`/article/${articleId}`} className="article-card-link" state={{ article }}>
                <div className="default-image-container">
                    <div className={`image-blur-wrapper ${imageLoaded ? 'loaded' : ''}`}>
                        <motion.img
                            src={imageUrl}
                            alt={title}
                            className="default-image"
                            onError={handleImageError}
                            onLoad={handleImageLoad}
                            loading="lazy"
                            variants={imgVariants}
                        />
                    </div>
                    {showCategory && (
                        <span className={`badge badge-floating ${getCategoryBadgeClass(categoryName)}`}>
                            {categoryName}
                        </span>
                    )}
                    {showBookmark && (
                        <div className="card-bookmark-wrapper">
                            <BookmarkButton article={article} size="sm" />
                        </div>
                    )}
                </div>
                <div className="default-body">
                    <h3 className="default-title animated-title">{truncateText(title, 80)}</h3>
                    {showExcerpt && description && (
                        <p className="default-excerpt">{truncateText(description, 120)}</p>
                    )}
                    {showMeta && (
                        <div className="default-meta">
                            <span className="default-source">{source_id}</span>
                            <span className="meta-separator">•</span>
                            <span>{formatDate(pubDate, 'relative')}</span>
                        </div>
                    )}
                </div>
            </Link>
        </motion.article>
    );
};

export default ArticleCard;
