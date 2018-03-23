const mongoose = require('mongoose');

const LunchOrdersSchema = new mongoose.Schema(
    {
        user: mongoose.Schema.Types.ObjectId,
        dishes: Array,
        date: { type: Date, default: Date.now }
    },
    { 
        versionKey: false 
    }
);

module.exports = mongoose.model('lunchorders', LunchOrdersSchema);