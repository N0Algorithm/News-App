import React, { createContext, useContext, useState, useEffect } from 'react';

/**
 * Bookmark Context
 * Manages saved articles in localStorage
 */
const BookmarkContext = createContext();

export const useBookmarks = () => {
    const context = useContext(BookmarkContext);
    if (!context) {
        throw new Error('useBookmarks must be used within a BookmarkProvider');
    }
    return context;
};

export const BookmarkProvider = ({ children }) => {
    const [bookmarks, setBookmarks] = useState([]);

    // Load bookmarks from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem('newsapp_bookmarks');
            if (stored) {
                setBookmarks(JSON.parse(stored));
            }
        } catch (error) {
            console.error('Error loading bookmarks:', error);
        }
    }, []);

    // Save bookmarks to localStorage whenever they change
    useEffect(() => {
        try {
            localStorage.setItem('newsapp_bookmarks', JSON.stringify(bookmarks));
        } catch (error) {
            console.error('Error saving bookmarks:', error);
        }
    }, [bookmarks]);

    // Check if article is bookmarked
    const isBookmarked = (articleId) => {
        return bookmarks.some(b => b.article_id === articleId);
    };

    // Add bookmark
    const addBookmark = (article) => {
        if (!isBookmarked(article.article_id)) {
            setBookmarks(prev => [...prev, { ...article, bookmarkedAt: new Date().toISOString() }]);
        }
    };

    // Remove bookmark
    const removeBookmark = (articleId) => {
        setBookmarks(prev => prev.filter(b => b.article_id !== articleId));
    };

    // Toggle bookmark
    const toggleBookmark = (article) => {
        if (isBookmarked(article.article_id)) {
            removeBookmark(article.article_id);
        } else {
            addBookmark(article);
        }
    };

    // Clear all bookmarks
    const clearBookmarks = () => {
        setBookmarks([]);
    };

    const value = {
        bookmarks,
        isBookmarked,
        addBookmark,
        removeBookmark,
        toggleBookmark,
        clearBookmarks,
        bookmarkCount: bookmarks.length
    };

    return (
        <BookmarkContext.Provider value={value}>
            {children}
        </BookmarkContext.Provider>
    );
};

export default BookmarkContext;
