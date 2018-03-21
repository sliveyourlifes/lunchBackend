const mongoose = require('mongoose');

const LunchDishesSchema = new mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        name: String,
        description: String,
        energyValue: String,
        date: { type: Date, default: Date.now }
    },
    { 
        versionKey: false 
    }
);

module.exports = mongoose.model('lunchdishes', LunchDishesSchema);