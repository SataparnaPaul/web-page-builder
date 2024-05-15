const express = require('express');
const router = express.Router();
const User = require('../../web-based-editor/backened/models/User');

// Register
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.create({ username, password });
    res.status(201).json({ user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Login
// Implement login route similarly

module.exports = router;
