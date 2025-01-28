import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './components/Login';
import PlaylistGenerator from './components/PlaylistGenerator';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Correctly inside the function component

  return (
    <Router>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Playlist Generator</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            {isLoggedIn && <Nav.Link as={Link} to="/playlist">Playlist Generator</Nav.Link>}
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/playlist" element={<PlaylistGenerator />} />
      </Routes>
    </Router>
  );
}

export default App;