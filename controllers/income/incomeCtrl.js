const expressAsyncHandler = require("express-async-handler");
const Income = require('../../model/Income');
const { paginate } = require("mongoose-paginate-v2");

// Create income
const createIncCtrl = expressAsyncHandler(async (req, res) => {
    const { title, amount, description } = req.body;
    try {
        const income = await Income.create({
            title, amount, description,
            user: req.user._id,
        });
        res.status(201).json(income);
    } catch (error) {
        res.status(400).json({ message: "Failed to create income", error: error.message });
    }
});

// Fetch all incomes
const fetchAllIncCtrl = expressAsyncHandler(async (req, res) => {
    const { page } = req.query;

    try {
        console.log("User Info:", req.user);

        if (!req.user || req.user.isAdmin === false || !req.user._id) {
            return res.status(403).json({ message: "User information is missing or incomplete" });
        }

        const filter = req.user.isAdmin ? {} : { user: req.user._id };
        const income = await Income.paginate(filter, {
            limit: 10,
            page: Number(page),
            populate: "user",
        });
        res.json(income);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch incomes", error: error.message });
    }
});

// Fetch single income details
const fetchIncDetailsCtrl = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const income = await Income.findById(id);
        if (!income) {
            return res.status(404).json({ message: "Income not found" });
        }
        res.json(income);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch income details", error: error.message });
    }
});

// Update income
const updateIncCtrl = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, description, amount } = req.body;
    
    try {
        const income = await Income.findByIdAndUpdate(id, {
            title, description, amount,
        }, { new: true });
        if (!income) {
            return res.status(404).json({ message: "Income not found" });
        }
        res.json(income);
    } catch (error) {
        res.status(500).json({ message: "Failed to update income", error: error.message });
    }
});

// Delete income
const deleteIncCtrl = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const income = await Income.findByIdAndDelete(id);
        if (!income) {
            return res.status(404).json({ message: "Income not found" });
        }
        res.json({ message: "Income deleted successfully", income });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete income", error: error.message });
    }
});

module.exports = {
    createIncCtrl,
    fetchAllIncCtrl,
    fetchIncDetailsCtrl,
    updateIncCtrl,
    deleteIncCtrl
};
