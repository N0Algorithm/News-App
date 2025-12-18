import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { formatDate, getImageFallback, getCategoryBadgeClass } from '../utils/newsUtils';
import './ArticlePage.css';

/**
 * ArticlePage Component
 * Dedicated article detail view
 */
const ArticlePage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [imageError, setImageError] = useState(false);
    // Get article from navigation state
    const article = location.state?.article;

    // Move hook before conditional returns
    useEffect(() => {
        if (article?.title) {
            document.title = article.title;
        }
    }, [article?.title]);

    // If no article in state (direct URL access), show fallback
    if (!article) {
        return (
            <div className="article-page">
                <div className="article-container">
                    <div className="article-not-found">
                        <h2>Article Not Found</h2>
                        <p>The article you're looking for could not be loaded.</p>
                        <Link to="/" className="btn btn-primary">
                            ← Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const {
        title,
        description,
        content,
        image_url,
        link,
        creator,
        pubDate,
        source_id,
        category,
        keywords
    } = article;

    const categoryName = category?.[0] || 'General';
    const author = creator?.[0] || 'Unknown Author';
    const imageUrl = imageError
        ? getImageFallback(categoryName)
        : (image_url || getImageFallback(categoryName));

    const handleImageError = () => {
        setImageError(true);
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    // Combine content from various fields for best display
    const fullContent = content || description || 'Full article content is not available.';

    // Check if content is truncated (newsdata.io often truncates)
    const isTruncated = fullContent.endsWith('...');

    return (
        <div className="article-page">
            {/* Hero Image */}
            <div className="article-hero">
                <img
                    src={imageUrl}
                    alt={title}
                    className="article-hero-image"
                    onError={handleImageError}
                />
                <div className="article-hero-overlay"></div>
            </div>

            <div className="article-container">
                {/* Back Button */}
                <button onClick={handleGoBack} className="back-button">
                    ← Back
                </button>

                {/* Article Header */}
                <header className="article-header">
                    <span className={`badge ${getCategoryBadgeClass(categoryName)}`}>
                        {categoryName}
                    </span>

                    <h1 className="article-title">{title}</h1>

                    <div className="article-meta">
                        <div className="article-meta-item">
                            <span className="meta-label">By</span>
                            <span className="meta-value author">{author}</span>
                        </div>
                        <div className="article-meta-separator">•</div>
                        <div className="article-meta-item">
                            <span className="meta-label">Published</span>
                            <time className="meta-value">{formatDate(pubDate, 'long')}</time>
                        </div>
                        <div className="article-meta-separator">•</div>
                        <div className="article-meta-item">
                            <span className="meta-label">Source</span>
                            <span className="meta-value source">{source_id}</span>
                        </div>
                    </div>
                </header>

                {/* Article Content */}
                <article className="article-content">
                    {description && description !== fullContent && (
                        <p className="article-lead">{description}</p>
                    )}

                    <div className="article-body">
                        {fullContent.split('\n').map((paragraph, index) => (
                            paragraph.trim() && (
                                <p key={index}>{paragraph}</p>
                            )
                        ))}
                    </div>

                    {/* Truncation Notice */}
                    {isTruncated && (
                        <div className="content-notice">
                            <p>
                                <strong>Note:</strong> This is a preview of the article.
                                For the full story, please visit the original source.
                            </p>
                            <a
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary"
                            >
                                Read Full Article on {source_id} →
                            </a>
                        </div>
                    )}
                </article>

                {/* Keywords/Tags */}
                {keywords && keywords.length > 0 && (
                    <div className="article-tags">
                        <span className="tags-label">Topics:</span>
                        <div className="tags-list">
                            {keywords.slice(0, 5).map((keyword, index) => (
                                <span key={index} className="tag">
                                    {keyword}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Share Section */}
                <div className="article-share">
                    <span className="share-label">Share this article:</span>
                    <div className="share-buttons">
                        <a
                            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(link)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="share-btn share-twitter"
                            aria-label="Share on Twitter"
                        >
                            𝕏
                        </a>
                        <a
                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="share-btn share-facebook"
                            aria-label="Share on Facebook"
                        >
                            f
                        </a>
                        <a
                            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(link)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="share-btn share-linkedin"
                            aria-label="Share on LinkedIn"
                        >
                            in
                        </a>
                        <button
                            onClick={() => navigator.clipboard.writeText(link)}
                            className="share-btn share-copy"
                            aria-label="Copy link"
                        >
                            🔗
                        </button>
                    </div>
                </div>

                {/* Footer Navigation */}
                <footer className="article-footer">
                    <Link to="/" className="btn btn-outline-dark">
                        ← Back to Home
                    </Link>
                    <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                    >
                        View Original Source
                    </a>
                </footer>
            </div>
        </div>
    );
};

export default ArticlePage;
