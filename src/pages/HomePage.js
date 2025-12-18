import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import HeroSection from '../components/HeroSection';
import FeaturedArticles from '../components/FeaturedArticles';
import BreakingNewsBanner from '../components/BreakingNewsBanner';
import ArticleCard from '../components/ArticleCard';
import Loading from '../components/Loading';
import {
    getHeroArticle,
    getFeaturedArticles,
    getLatestArticles,
    removeDuplicates,
    detectBreakingNews
} from '../utils/newsUtils';
import { sampleArticles } from '../utils/sampleData';
import './HomePage.css';

/**
 * HomePage Component
 * Main landing page with editorial layout:
 * - Breaking news banner (if applicable)
 * - Hero story
 * - Featured articles grid
 * - Latest news with infinite scroll
 */
const HomePage = ({ apiKey }) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [nextPage, setNextPage] = useState(null);
    const [breakingNews, setBreakingNews] = useState([]);

    // Fetch initial news
    const fetchNews = async () => {
        const url = `https://newsdata.io/api/1/latest?apikey=${apiKey}&language=en`;
        setLoading(true);

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`API returned status ${response.status}`);
            }
            const data = await response.json();

            if (data.status === 'error') {
                throw new Error(data.message || 'API returned an error');
            }

            console.log('API Response:', data);

            const results = Array.isArray(data.results) ? data.results : [];
            const uniqueArticles = removeDuplicates(results);

            setArticles(uniqueArticles);
            setNextPage(data.nextPage || null);

            // Detect breaking news
            const breaking = detectBreakingNews(uniqueArticles);
            setBreakingNews(breaking);

            if (uniqueArticles.length === 0) {
                // Fallback if results are empty but no error was thrown
                setArticles(sampleArticles);
                setBreakingNews(sampleArticles.slice(0, 3));
            }

            // Add class to body if breaking news exists
            if (breaking.length > 0) {
                document.body.classList.add('has-breaking-news');
            } else {
                document.body.classList.remove('has-breaking-news');
            }
        } catch (error) {
            console.error('Failed to fetch news, using sample data:', error);
            setArticles(sampleArticles);
            setBreakingNews(sampleArticles.slice(0, 3));
        }

        setLoading(false);
    };

    // Fetch more data for infinite scroll
    const fetchMoreData = async () => {
        if (!nextPage) return;

        const url = `https://newsdata.io/api/1/latest?apikey=${apiKey}&language=en&page=${nextPage}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            const newArticles = data.results || [];

            if (newArticles.length === 0 && articles.length > 0) {
                // If we hit a limit while scrolling, we could optionally show more sample data
                // for now just stop scrolling
                setNextPage(null);
                return;
            }

            const combined = [...articles, ...newArticles];
            const uniqueArticles = removeDuplicates(combined);

            setArticles(uniqueArticles);
            setNextPage(data.nextPage || null);
        } catch (error) {
            console.error('Failed to fetch more data:', error);
        }
    };

    useEffect(() => {
        document.title = 'Latest & Breaking News';
        fetchNews();

        return () => {
            document.body.classList.remove('has-breaking-news');
        };
        // eslint-disable-next-line
    }, []);

    // Editorial content distribution
    const heroArticle = getHeroArticle(articles);
    const featuredArticles = getFeaturedArticles(articles);
    const latestArticles = getLatestArticles(articles);

    if (loading) {
        return (
            <div className="homepage">
                <div className="loading-container">
                    <Loading />
                </div>
            </div>
        );
    }

    return (
        <div className="homepage">
            {/* Breaking News Banner */}
            {breakingNews.length > 0 && (
                <BreakingNewsBanner articles={breakingNews} />
            )}

            {/* Hero Section */}
            <HeroSection article={heroArticle} />

            {/* Featured Articles */}
            {featuredArticles.length > 0 && (
                <FeaturedArticles
                    articles={featuredArticles}
                    title="Featured Stories"
                />
            )}

            {/* Latest News Section */}
            <section className="latest-section">
                <div className="latest-container">
                    <div className="section-header">
                        <h2 className="section-title">Latest News</h2>
                    </div>

                    <InfiniteScroll
                        dataLength={latestArticles.length}
                        next={fetchMoreData}
                        hasMore={nextPage !== null}
                        loader={<Loading />}
                        endMessage={
                            <p className="end-message">
                                You've reached the end of the news feed.
                            </p>
                        }
                    >
                        <div className="latest-grid">
                            {latestArticles.map((article, index) => (
                                <ArticleCard
                                    key={article.article_id || index}
                                    article={article}
                                    variant="default"
                                />
                            ))}
                        </div>
                    </InfiniteScroll>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
