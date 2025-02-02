import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import './Login.css';

const Login = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [showSignup, setShowSignup] = useState(false);
  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/auth/login', {
        username, 
        password, 
      });
      if (response.data.message === 'Login successful') {
        setIsLoggedIn(true);
        navigate('/playlist');
      }
    } catch (error) {
      setError('Invalid username or password.');
    }
  };

  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleSignupSubmit = () => {
    console.log('Signup Data:', signupData);
    setShowSignup(false);
  };

  return (
    <Container className="d-flex justify-content-center align-items-center login-container">
      <Card className="login-card p-4 shadow-lg">
        <Card.Body>
          <h2 className="text-center">Welcome to Playlist Generator</h2>
          <p className="text-center text-muted">Discover and generate the perfect playlists based on your mood.</p>
          {error && <p className="text-danger text-center">{error}</p>}
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="success" type="submit" className="w-100">Login</Button>
          </Form>
          <p className="text-center mt-3 text-muted">Create personalized playlists based on your mood and save them for later.</p>
          <p className="text-center mt-3">
            Don't have an account? 
            <Button variant="link" className="p-0 text-primary" onClick={() => setShowSignup(true)}>Create an Account</Button>
          </p>
        </Card.Body>
      </Card>

      <Modal show={showSignup} onHide={() => setShowSignup(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" name="firstName" placeholder="Enter first name" onChange={handleSignupChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" name="lastName" placeholder="Enter last name" onChange={handleSignupChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" placeholder="Enter email" onChange={handleSignupChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="tel" name="phoneNumber" placeholder="Enter phone number" onChange={handleSignupChange} required />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSignup(false)}>Cancel</Button>
          <Button variant="success" onClick={handleSignupSubmit}>Sign Up</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Login;