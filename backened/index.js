const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const port = 5000;

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_ATLAS_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(error => {
    console.error('Error connecting to MongoDB Atlas:', error.message);
    process.exit(1);  // Exit the process if connection fails
  });

app.use(cors());
app.use(express.json());

const User = require('./models/User');
const ComponentPosition = require('./models/ComponentPosition');

// User authentication routes
app.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).send({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.send({ token });
  } catch (error) {
    res.status(400).send(error);
  }
});

// Middleware to authenticate JWT token
const authenticate = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).send({ message: 'Unauthorized' });
  }
};

// Component position routes
app.get('/components', authenticate, async (req, res) => {
  try {
    const componentPositions = await ComponentPosition.findOne({ userId: req.userId });
    res.send({ components: componentPositions ? componentPositions.components : [] });
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post('/components', authenticate, async (req, res) => {
  try {
    const { components } = req.body;
    let componentPosition = await ComponentPosition.findOne({ userId: req.userId });
    if (!componentPosition) {
      componentPosition = new ComponentPosition({ userId: req.userId, components });
    } else {
      componentPosition.components = components;
    }
    await componentPosition.save();
    res.send({ message: 'Components saved' });
  } catch (error) {
    res.status(400).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
