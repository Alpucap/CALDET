const mongoose = require('mongoose');

// Define the schema for the Review model
const reviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        required: true
    },
    insight: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create the Review model using the schema
const Review = mongoose.model('Review', reviewSchema);

// Export the Review model
module.exports = Review;
