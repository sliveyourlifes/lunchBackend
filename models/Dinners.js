const mongoose = require('mongoose');

const DinnerSchema = new mongoose.Schema({
    name: String,
    description: String,
    energy_falue: String
});

module.exports = mongoose.model('menus', DinnerSchema);