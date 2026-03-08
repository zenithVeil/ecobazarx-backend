// In models/activityModel.js
const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', // This creates a link to the User model
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Product', // This creates a link to the Product model
  },
  action: {
    type: String,
    enum: ['view', 'purchase'], // The action can only be 'view' or 'purchase'
    required: true,
  },
  // We can store the carbon footprint at the time of the activity
  carbonFootprintAtTime: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Activity', activitySchema);