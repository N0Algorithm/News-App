import React from 'react';
import { useBookmarks } from '../context/BookmarkContext';
import './BookmarkButton.css';

/**
 * BookmarkButton Component
 * Toggle button for saving/unsaving articles
 */
const BookmarkButton = ({ article, size = 'default', showLabel = false }) => {
    const { isBookmarked, toggleBookmark } = useBookmarks();

    if (!article || !article.article_id) return null;

    const bookmarked = isBookmarked(article.article_id);

    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleBookmark(article);
    };

    return (
        <button
            className={`bookmark-btn bookmark-${size} ${bookmarked ? 'bookmarked' : ''}`}
            onClick={handleClick}
            aria-label={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
            title={bookmarked ? 'Remove from saved' : 'Save article'}
        >
            <svg
                viewBox="0 0 24 24"
                fill={bookmarked ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeWidth="2"
                className="bookmark-icon"
            >
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
            {showLabel && (
                <span className="bookmark-label">
                    {bookmarked ? 'Saved' : 'Save'}
                </span>
            )}
        </button>
    );
};

export default BookmarkButton;
