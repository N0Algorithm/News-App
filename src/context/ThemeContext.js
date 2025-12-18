import React, { createContext, useContext, useState, useEffect } from 'react';

/**
 * Theme Context
 * Manages dark/light mode with localStorage persistence
 */
const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export const ThemeProvider = ({ children }) => {
    const [isDark, setIsDark] = useState(false);

    // Load theme from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem('newsapp_theme');
            if (stored) {
                setIsDark(stored === 'dark');
            } else {
                // Check system preference
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                setIsDark(prefersDark);
            }
        } catch (error) {
            console.error('Error loading theme:', error);
        }
    }, []);

    // Apply theme to document and save to localStorage
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
        localStorage.setItem('newsapp_theme', isDark ? 'dark' : 'light');
    }, [isDark]);

    const toggleTheme = () => {
        setIsDark(prev => !prev);
    };

    const setTheme = (dark) => {
        setIsDark(dark);
    };

    const value = {
        isDark,
        toggleTheme,
        setTheme,
        theme: isDark ? 'dark' : 'light'
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeContext;
