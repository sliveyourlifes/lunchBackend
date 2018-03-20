const mongoose = require('mongoose');

const DinnerSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    menuList: [
                {
                    name: String,
                    description: String,
                    energyValue: String
                }
              ]
    },
    { 
        versionKey: false 
    }
);

module.exports = mongoose.model('menus', DinnerSchema);