const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  category: {
    type: String,
    required: true
  },

  location: {
    type: String,
    required: true
  },

  image: {
    type: String
  },

  status: {
    type: String,
    enum: ["lost", "found"],
    required: true
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }

}, {
  timestamps: true
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;