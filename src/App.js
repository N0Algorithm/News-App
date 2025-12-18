import './App.css';
import './styles/variables.css';
import './styles/components.css';
import './styles/animations.css';
import React from 'react';
import NavBar from './components/Navbar';
import HomePage from './pages/HomePage';
import ArticlePage from './pages/ArticlePage';
import SavedPage from './pages/SavedPage';
import News from './components/News';
import { BookmarkProvider } from './context/BookmarkContext';
import { ThemeProvider } from './context/ThemeContext';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const App = () => {
  const pageSize = 5;
  const apiKey = process.env.REACT_APP_NEWS_API

  return (
    <ThemeProvider>
      <BookmarkProvider>
        <div className="app">
          <Router>
            <NavBar />
            <Routes>
              {/* Main Homepage with Editorial Layout */}
              <Route path="/" element={<HomePage apiKey={apiKey} />} />

              {/* Article Detail Page */}
              <Route path="/article/:id" element={<ArticlePage />} />

              {/* Saved Articles Page */}
              <Route path="/saved" element={<SavedPage />} />

              {/* Category Pages */}
              <Route path="/business" element={<News apiKey={apiKey} key="business" pageSize={pageSize} country="us" category="business" />} />
              <Route path="/entertainment" element={<News apiKey={apiKey} key="entertainment" pageSize={pageSize} country="us" category="entertainment" />} />
              <Route path="/general" element={<News apiKey={apiKey} key="general" pageSize={pageSize} country="us" category="general" />} />
              <Route path="/health" element={<News apiKey={apiKey} key="health" pageSize={pageSize} country="us" category="health" />} />
              <Route path="/science" element={<News apiKey={apiKey} key="science" pageSize={pageSize} country="us" category="science" />} />
              <Route path="/sports" element={<News apiKey={apiKey} key="sports" pageSize={pageSize} country="us" category="sports" />} />
              <Route path="/technology" element={<News apiKey={apiKey} key="technology" pageSize={pageSize} country="us" category="technology" />} />

              {/* 404 Page */}
              <Route path="*" element={
                <div className="not-found-page">
                  <h2>404 - Page Not Found</h2>
                  <p>The page you're looking for doesn't exist.</p>
                </div>
              } />
            </Routes>
          </Router>
        </div>
      </BookmarkProvider>
    </ThemeProvider>
  )
}

export default App;
