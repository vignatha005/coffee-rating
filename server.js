const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Coffee = require("./models/Coffee");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/coffeeRating")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Get all coffees
app.get("/api/coffees", async (req, res) => {
    try {
        const coffees = await Coffee.find().sort({ votes: -1 });
        res.json(coffees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Vote for a coffee
app.put("/api/coffees/vote/:id", async (req, res) => {
    try {
        const coffee = await Coffee.findById(req.params.id);

        if (!coffee) {
            return res.status(404).json({
                message: "Coffee not found"
            });
        }

        coffee.votes += 1;
        await coffee.save();

        res.json(coffee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Seed database with sample coffees
app.get("/seed", async (req, res) => {
    try {
        await Coffee.deleteMany({});

        await Coffee.insertMany([
            {
                name: "Espresso",
                image: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a",
                votes: 0
            },
            {
                name: "Cappuccino",
                image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
                votes: 0
            },
            {
                name: "Latte",
                image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
                votes: 0
            },
            {
                name: "Americano",
                image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e",
                votes: 0
            }
        ]);

        res.send("Coffee data seeded successfully!");
    } catch (error) {
        res.status(500).json(error);
    }
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
app.put("/reset-votes", async (req, res) => {
    try {
        await Coffee.updateMany({}, { votes: 0 });

        res.json({
            message: "All votes reset successfully"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});