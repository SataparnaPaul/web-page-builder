const express = require('express');
const router = express.Router();
const Component = require('../../web-based-editor/backened/models/Component');

// Fetch all components
router.get('/', async (req, res) => {
  try {
    const components = await Component.find();
    res.json(components);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add more routes as needed (e.g., create component, update component)

module.exports = router;
