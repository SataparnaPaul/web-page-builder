const mongoose = require('mongoose');

const ComponentSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  x: {
    type: Number,
    required: true,
  },
  y: {
    type: Number,
    required: true,
  },
  props: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
});

const ComponentPositionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  components: [ComponentSchema],
});

module.exports = mongoose.model('ComponentPosition', ComponentPositionSchema);
