const express = require("express");
const router = express.Router();
const Coffee = require("../models/Coffee");

// Get all coffees
router.get("/", async (req, res) => {
  try {
    const coffees = await Coffee.find();
    res.json(coffees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Vote for coffee
router.put("/vote/:id", async (req, res) => {
  try {
    const coffee = await Coffee.findById(req.params.id);

    coffee.votes += 1;

    await coffee.save();

    res.json(coffee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;