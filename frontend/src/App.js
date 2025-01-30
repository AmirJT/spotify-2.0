import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './components/Login';
import PlaylistGenerator from './components/PlaylistGenerator';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import './App.css';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });
  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : 'light-mode';
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);
  return (
    <Router>
      <Navbar bg={darkMode ? "dark" : "light"} variant={darkMode ? "dark" : "light"} className="shadow-sm">
        <Container>
          <Navbar.Brand as={Link} to="/" className="brand-text">:musical_note: Playlist Generator</Navbar.Brand>
          <Nav className="me-auto">
           </Nav>
          <Button variant={darkMode ? "light" : "dark"} onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? ':sunny: Light Mode' : ':crescent_moon: Dark Mode'}
          </Button>
        </Container>
      </Navbar>
      <div className="content-wrapper">
        <Routes>
          <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/playlist" element={<PlaylistGenerator />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;