const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate')


const UserSchema = new mongoose.Schema(
    {
        profileId: Number,
        profile: Object
    },
    {
        versionKey: false 
    }
);

UserSchema.plugin(findOrCreate);

module.exports = mongoose.model('users', UserSchema);