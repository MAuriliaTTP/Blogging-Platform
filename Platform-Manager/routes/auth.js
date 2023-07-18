const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../models/User');

// Middleware for user authentication
const authenticateUser = (req, res, next) => {
    if (req.session.user) {
      // User is authenticated, proceed to the next middleware or route handler
      next();
    } else {
      res.status(401).json({ error: 'Unauthorized' });
    }
  };

// User registration endpoint
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// User login endpoint
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare the passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Set session cookie upon successful login
    req.session.user = user;

    res.json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// User profile endpoint (requires authentication)
router.get('/profile', authenticateUser, (req, res) => {
    const user = req.session.user;
    res.json(user);
  });

module.exports = router;