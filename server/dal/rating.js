const mongoose = require('mongoose');

const ratingSchema = mongoose.Schema({
    comment: {type: mongoose.Schema.Types.ObjectId, ref: "Comment"},
    userId: String,
    rating: Number
});

module.exports = mongoose.model('Rating', ratingSchema);
