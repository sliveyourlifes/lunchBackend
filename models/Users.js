const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        profileId: Number,
        profile: Object
    },
    {
        versionKey: false 
    }
);

module.exports = mongoose.model('users', UserSchema);