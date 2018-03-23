const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        profileId: Number,
        profile: Object
    },
    {
        versionKey: false
    }
);

module.exports = mongoose.model('users', UserSchema);