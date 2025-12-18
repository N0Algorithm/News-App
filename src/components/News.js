import React, { useEffect, useState } from 'react';
import ArticleCard from './ArticleCard';
import Loading from './Loading';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";
import { removeDuplicates, capitalizeFirstLetter, getCategoryColor } from '../utils/newsUtils';
import { getSampleByCategory } from '../utils/sampleData';
import './News.css';

/**
 * News Component
 * Category-specific news page with redesigned layout
 */
const News = (props) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [nextPage, setNextPage] = useState(null);

    const updateNews = async () => {
        const url = `https://newsdata.io/api/1/latest?apikey=${props.apiKey}&language=en`;
        setLoading(true);
        try {
            let response = await fetch(url);
            if (!response.ok) {
                throw new Error(`API returned status ${response.status}`);
            }
            let parsedData = await response.json();

            if (parsedData.status === 'error') {
                throw new Error(parsedData.message || 'API returned an error');
            }

            const resultsArray = Array.isArray(parsedData.results) ? parsedData.results : [];
            const uniqueArticles = removeDuplicates(resultsArray);

            if (uniqueArticles.length === 0) {
                setArticles(getSampleByCategory(props.category));
            } else {
                setArticles(uniqueArticles);
                setNextPage(parsedData.nextPage || null);
            }
        } catch (error) {
            console.error("Failed to update news, using sample data:", error);
            setArticles(getSampleByCategory(props.category));
        }
        setLoading(false);
    };

    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)} News`;
        updateNews();
        // eslint-disable-next-line
    }, [props.category]);

    const fetchMoreData = async () => {
        if (!nextPage) return;

        const url = `https://newsdata.io/api/1/latest?apikey=${props.apiKey}&language=en&page=${nextPage}`;
        try {
            let data = await fetch(url);
            let parsedData = await data.json();

            const newArticles = parsedData.results || [];
            const combined = [...articles, ...newArticles];
            setArticles(removeDuplicates(combined));
            setNextPage(parsedData.nextPage || null);
        } catch (error) {
            console.error("Failed to fetch more data:", error);
        }
    };

    return (
        <div className="category-page">
            {/* Category Header */}
            <div className="category-page-header">
                <div className="category-page-container">
                    <div
                        className="category-indicator-large"
                        style={{ backgroundColor: getCategoryColor(props.category) }}
                    ></div>
                    <div className="category-page-info">
                        <h1 className="category-page-title">
                            {capitalizeFirstLetter(props.category)}
                        </h1>
                        <p className="category-page-subtitle">
                            Top headlines and latest news in {props.category}
                        </p>
                    </div>
                </div>
            </div>

            {/* Loading State */}
            {loading && (
                <div className="category-loading">
                    <Loading />
                </div>
            )}

            {/* Articles Grid */}
            {!loading && (
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={nextPage !== null}
                    loader={<Loading />}
                    endMessage={
                        <p className="end-message">
                            You've reached the end of {props.category} news.
                        </p>
                    }
                >
                    <div className="category-page-content">
                        <div className="category-articles-grid">
                            {articles.map((article, index) => (
                                <ArticleCard
                                    key={article.article_id || index}
                                    article={article}
                                    variant="default"
                                />
                            ))}
                        </div>
                    </div>
                </InfiniteScroll>
            )}

            {/* Empty State */}
            {!loading && articles.length === 0 && (
                <div className="category-empty">
                    <h3>No articles found</h3>
                    <p>Check back later for {props.category} news.</p>
                </div>
            )}
        </div>
    );
}

News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News;
