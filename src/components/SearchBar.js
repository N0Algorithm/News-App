import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';

/**
 * SearchBar Component
 * Expandable search input with suggestions
 */
const SearchBar = ({ articles = [], onSearch }) => {
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const inputRef = useRef(null);
    const wrapperRef = useRef(null);
    const navigate = useNavigate();

    // Filter suggestions based on query
    useEffect(() => {
        if (query.length < 2) {
            setSuggestions([]);
            return;
        }

        const filtered = articles
            .filter(article =>
                article.title?.toLowerCase().includes(query.toLowerCase()) ||
                article.description?.toLowerCase().includes(query.toLowerCase())
            )
            .slice(0, 5);

        setSuggestions(filtered);
        setSelectedIndex(-1);
    }, [query, articles]);

    // Handle click outside to close
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
                setSuggestions([]);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleInputChange = (e) => {
        setQuery(e.target.value);
        if (e.target.value.length > 0) {
            setIsOpen(true);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex(prev =>
                prev < suggestions.length - 1 ? prev + 1 : prev
            );
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (selectedIndex >= 0 && suggestions[selectedIndex]) {
                handleSuggestionClick(suggestions[selectedIndex]);
            } else if (query.trim()) {
                handleSearch();
            }
        } else if (e.key === 'Escape') {
            setIsOpen(false);
            setSuggestions([]);
        }
    };

    const handleSearch = () => {
        if (onSearch && query.trim()) {
            onSearch(query.trim());
        }
        setSuggestions([]);
        setIsOpen(false);
    };

    const handleSuggestionClick = (article) => {
        navigate(`/article/${article.article_id}`, { state: { article } });
        setQuery('');
        setSuggestions([]);
        setIsOpen(false);
    };

    const handleFocus = () => {
        setIsOpen(true);
        if (query.length >= 2) {
            // Trigger suggestions display
        }
    };

    return (
        <div className="search-wrapper" ref={wrapperRef}>
            <div className={`search-bar ${isOpen ? 'open' : ''}`}>
                <button
                    className="search-toggle"
                    onClick={() => {
                        setIsOpen(true);
                        setTimeout(() => inputRef.current?.focus(), 100);
                    }}
                    aria-label="Open search"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" />
                        <path d="M21 21l-4.35-4.35" />
                    </svg>
                </button>

                <input
                    ref={inputRef}
                    type="search"
                    className="search-input"
                    placeholder="Search news..."
                    value={query}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onFocus={handleFocus}
                    aria-label="Search news"
                    aria-expanded={suggestions.length > 0}
                    aria-haspopup="listbox"
                />

                {query && (
                    <button
                        className="search-clear"
                        onClick={() => {
                            setQuery('');
                            setSuggestions([]);
                            inputRef.current?.focus();
                        }}
                        aria-label="Clear search"
                    >
                        ×
                    </button>
                )}
            </div>

            {/* Suggestions dropdown */}
            {isOpen && suggestions.length > 0 && (
                <div className="search-suggestions" role="listbox">
                    {suggestions.map((article, index) => (
                        <div
                            key={article.article_id || index}
                            className={`search-suggestion ${index === selectedIndex ? 'selected' : ''}`}
                            onClick={() => handleSuggestionClick(article)}
                            role="option"
                            aria-selected={index === selectedIndex}
                        >
                            {article.image_url && (
                                <img
                                    src={article.image_url}
                                    alt=""
                                    className="suggestion-image"
                                    onError={(e) => e.target.style.display = 'none'}
                                />
                            )}
                            <div className="suggestion-content">
                                <span className="suggestion-title">{article.title}</span>
                                <span className="suggestion-source">{article.source_id}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
