import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './components/Login';
import PlaylistGenerator from './components/PlaylistGenerator';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import './App.css';
import apiBaseUrl from './api'; 
import axios from 'axios';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  const [data, setData] = useState(null);

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : 'light-mode';
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    axios.get(`${apiBaseUrl}/api/some-endpoint`) 
      .then((response) => {
        setData(response.data);
        console.log("Fetched Data:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error.response?.data || error.message);
      });
  }, []);

  return (
    <Router>
      <Navbar bg={darkMode ? "dark" : "light"} variant={darkMode ? "dark" : "light"} className="shadow-sm">
        <Container>
          <Navbar.Brand as={Link} to="/" className="brand-text">🎵 Playlist Generator</Navbar.Brand>
          <Nav className="me-auto">
          </Nav>
          <Button variant={darkMode ? "light" : "dark"} onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? '☀ Light Mode' : '🌙 Dark Mode'}
          </Button>
        </Container>
      </Navbar>

      <div className="content-wrapper">
        <Routes>
          <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/playlist" element={isLoggedIn ? <PlaylistGenerator /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
        </Routes>
      </div>
            
    </Router>
  );
}

export default App;
