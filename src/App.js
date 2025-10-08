import './App.css';
import React from 'react'
import NavBar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
const App = ()=> {
  const pageSize = 5;
  const apiKey = process.env.REACT_APP_NEWS_API


  return (
    <div>
      <Router> {/* <-- add basename here */}
        <NavBar expand="lg" bg="light" variant="light"/> 
        <Routes>
          <Route path="/" element={<News apiKey={apiKey} key="general" pageSize={pageSize} country="us" category="general"/>}></Route> 
          <Route path="/business" element={<News apiKey={apiKey} key="business" pageSize={pageSize} country="us" category="business"/>}></Route> 
          <Route path="/entertainment" element={<News apiKey={apiKey} key="entertainment" pageSize={pageSize} country="us" category="entertainment"/>}></Route> 
          <Route path="/general" element={<News apiKey={apiKey} key="general" pageSize={pageSize} country="us" category="general"/>}></Route> 
          <Route path="/health" element={<News apiKey={apiKey} key="health" pageSize={pageSize} country="us" category="health"/>}></Route> 
          <Route path="/science" element={<News apiKey={apiKey} key="science" pageSize={pageSize} country="us" category="science"/>}></Route> 
          <Route path="/sports" element={<News apiKey={apiKey} key="sports" pageSize={pageSize} country="us" category="sports"/>}></Route> 
          <Route path="/technology" element={<News apiKey={apiKey} key="technology" pageSize={pageSize} country="us" category="technology"/>}></Route> 
        <Route path="*" element={<h2>404 - Page Not Found</h2>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;
