const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
  console.log('Received login request:', req.body);
  const { username, password } = req.body;

  
  if (username === 'group5' && password === 'group5') {
    res.json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

module.exports = router;