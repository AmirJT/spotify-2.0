import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './components/Login';
import PlaylistGenerator from './components/PlaylistGenerator';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import './App.css';
import { fetchData } from './api';

function App() {
  // Dark mode and routing state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  // Data fetching state
  const [data, setData] = useState(null);

  // Dark mode effect
  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : 'light-mode';
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // Data fetching effect
  useEffect(() => {
    fetchData().then(setData).catch(console.error);
  }, []);

  return (
    <Router>
      <Navbar bg={darkMode ? "dark" : "light"} variant={darkMode ? "dark" : "light"} className="shadow-sm">
        <Container>
          <Navbar.Brand as={Link} to="/" className="brand-text">🎵 Playlist Generator</Navbar.Brand>
          <Nav className="me-auto">
            {/* Additional Nav items */}
          </Nav>
          <Button variant={darkMode ? "light" : "dark"} onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? '☀ Light Mode' : '🌙 Dark Mode'}
          </Button>
        </Container>
      </Navbar>
      <div className="content-wrapper">
        <Routes>
          <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/playlist" element={<PlaylistGenerator />} />
        </Routes>
      </div>
      {/* You can show your fetched data somewhere in the app if needed */}
      <div className="data-display">
        <h1>My React App Data</h1>
        {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : 'Loading...'}
      </div>
    </Router>
  );
}

export default App;