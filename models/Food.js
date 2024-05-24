// models/Food.js

const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    name: String,
    size: String,
    calorie: Number
});

const Food = mongoose.model('Food', foodSchema, 'FoodCalories');

module.exports = Food;
