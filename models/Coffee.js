const mongoose = require("mongoose");

const coffeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  votes: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("Coffee", coffeeSchema);