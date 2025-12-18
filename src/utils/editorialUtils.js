/**
 * Editorial Utility Functions
 * Handles content hierarchy, breaking news detection, and image fallbacks
 */

// Keywords that indicate breaking news
const BREAKING_KEYWORDS = [
    'breaking',
    'urgent',
    'developing',
    'just in',
    'alert',
    'emergency',
    'live',
    'update'
];

// Category-specific fallback images (using placeholder service)
const CATEGORY_FALLBACKS = {
    business: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    technology: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
    health: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
    science: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=800&q=80',
    sports: 'https://images.unsplash.com/photo-1461896836934- voices76b894d?w=800&q=80',
    entertainment: 'https://images.unsplash.com/photo-1603190287605-e6ade32fa852?w=800&q=80',
    general: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80',
    default: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&q=80'
};

/**
 * Get the hero article (first article with image)
 * @param {Array} articles - Array of article objects
 * @returns {Object|null} - Hero article or null
 */
export const getHeroArticle = (articles) => {
    if (!articles || articles.length === 0) return null;

    // Prefer article with image for hero
    const withImage = articles.find(article => article.image_url);
    return withImage || articles[0];
};

/**
 * Get featured articles (next 4 articles after hero)
 * @param {Array} articles - Array of article objects
 * @returns {Array} - Array of 4 featured articles
 */
export const getFeaturedArticles = (articles) => {
    if (!articles || articles.length <= 1) return [];

    // Skip the hero article (first one) and get next 4
    return articles.slice(1, 5);
};

/**
 * Get remaining articles for the latest news section
 * @param {Array} articles - Array of article objects
 * @returns {Array} - Remaining articles after hero and featured
 */
export const getLatestArticles = (articles) => {
    if (!articles || articles.length <= 5) return [];

    return articles.slice(5);
};

/**
 * Detect breaking news articles based on keywords and time
 * @param {Array} articles - Array of article objects
 * @param {number} maxAgeHours - Maximum age in hours to consider breaking (default 2)
 * @returns {Array} - Array of breaking news articles
 */
export const detectBreakingNews = (articles, maxAgeHours = 2) => {
    if (!articles || articles.length === 0) return [];

    const now = new Date();
    const maxAgeMs = maxAgeHours * 60 * 60 * 1000;

    return articles.filter(article => {
        // Check time-based criteria
        const pubDate = new Date(article.pubDate);
        const isRecent = (now - pubDate) < maxAgeMs;

        // Check keyword-based criteria
        const title = (article.title || '').toLowerCase();
        const description = (article.description || '').toLowerCase();
        const hasKeyword = BREAKING_KEYWORDS.some(keyword =>
            title.includes(keyword) || description.includes(keyword)
        );

        return isRecent && hasKeyword;
    });
};

/**
 * Get fallback image URL based on category
 * @param {string} category - Article category
 * @returns {string} - Fallback image URL
 */
export const getImageFallback = (category) => {
    const normalizedCategory = (category || 'default').toLowerCase();
    return CATEGORY_FALLBACKS[normalizedCategory] || CATEGORY_FALLBACKS.default;
};

/**
 * Format date for display
 * @param {string} dateString - ISO date string
 * @param {string} format - 'short', 'long', or 'relative'
 * @returns {string} - Formatted date string
 */
export const formatDate = (dateString, format = 'short') => {
    if (!dateString) return '';

    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (format === 'relative') {
        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;
    }

    if (format === 'long') {
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    // Short format (default)
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
};

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} - Truncated text with ellipsis
 */
export const truncateText = (text, maxLength = 150) => {
    if (!text || text.length <= maxLength) return text || '';
    return text.substring(0, maxLength).trim() + '...';
};

/**
 * Generate unique ID for articles (for routing)
 * Uses article_id from newsdata.io or creates a slug
 * @param {Object} article - Article object
 * @returns {string} - Unique identifier
 */
export const getArticleId = (article) => {
    if (article.article_id) return article.article_id;

    // Fallback: create slug from title
    const slug = (article.title || 'article')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
        .substring(0, 50);

    return slug;
};

/**
 * Get category badge class
 * @param {string} category - Category name
 * @returns {string} - CSS class name
 */
export const getCategoryBadgeClass = (category) => {
    const normalizedCategory = (category || 'general').toLowerCase();
    return `badge-${normalizedCategory}`;
};

/**
 * Remove duplicate articles based on title similarity
 * @param {Array} articles - Array of article objects
 * @returns {Array} - Deduplicated articles
 */
export const removeDuplicates = (articles) => {
    if (!articles || articles.length === 0) return [];

    const seen = new Set();
    return articles.filter(article => {
        // Normalize title for comparison
        const normalizedTitle = (article.title || '')
            .toLowerCase()
            .replace(/[^a-z0-9]/g, '')
            .substring(0, 50);

        if (seen.has(normalizedTitle)) return false;
        seen.add(normalizedTitle);
        return true;
    });
};
