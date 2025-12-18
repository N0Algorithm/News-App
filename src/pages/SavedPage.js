import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useBookmarks } from '../context/BookmarkContext';
import ArticleCard from '../components/ArticleCard';
import './SavedPage.css';

/**
 * SavedPage Component
 * Displays user's bookmarked articles
 */
const SavedPage = () => {
    const { bookmarks, clearBookmarks, bookmarkCount } = useBookmarks();

    useEffect(() => {
        document.title = 'Saved Articles';
    }, []);

    return (
        <div className="saved-page">
            <div className="saved-container">
                <div className="saved-header">
                    <div className="saved-header-left">
                        <h1 className="saved-title">Saved Articles</h1>
                        <span className="saved-count">{bookmarkCount} article{bookmarkCount !== 1 ? 's' : ''}</span>
                    </div>
                    {bookmarkCount > 0 && (
                        <button
                            className="clear-all-btn"
                            onClick={() => {
                                if (window.confirm('Clear all saved articles?')) {
                                    clearBookmarks();
                                }
                            }}
                        >
                            Clear All
                        </button>
                    )}
                </div>

                {bookmarkCount === 0 ? (
                    <div className="saved-empty">
                        <div className="empty-icon">📑</div>
                        <h2>No Saved Articles</h2>
                        <p>Articles you save will appear here for easy access.</p>
                        <Link to="/" className="btn btn-primary">
                            Browse News
                        </Link>
                    </div>
                ) : (
                    <div className="saved-grid">
                        {bookmarks.map((article, index) => (
                            <ArticleCard
                                key={article.article_id || index}
                                article={article}
                                variant="default"
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SavedPage;
