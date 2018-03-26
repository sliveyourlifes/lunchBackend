const YandexStrategy = require('passport-yandex').Strategy;
const Users = require('./../models/Users.js');
const mongoose = require('mongoose');

const haveRednavisEmail = (emails) => {
    return emails.reduce((valid, email) => {
        return valid = valid + (email.value.indexOf('@rednavis.com') !== -1);
    }, 0);
};

const handleLoggedUser = (profile, done) => {
    Users.findOneAndUpdate({ profileId: profile.id },{ profile: profile._json }, { new: true , upsert: true },
        function (err, user) {
            done(err, user);
        }
    );
};

module.exports = function(passport) {
    //credentials for Yandex
    const YANDEX_CLIENT_ID = "cd85db83d6914976ba839957733ab2dc";
    const YANDEX_CLIENT_SECRET = "a8549941e9304ac6982808c2cb1a2b3a";

    // Passport session setup.
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => Users.findById(id, (err, user) => done(null,user)));
    
    passport.use(
        new YandexStrategy({
            clientID: YANDEX_CLIENT_ID,
            clientSecret: YANDEX_CLIENT_SECRET,
            callbackURL: "http://localhost:3000/auth/yandex/callback"
        },
        (accessToken, refreshToken, profile, done) => {
            if (haveRednavisEmail(profile.emails)) {
                handleLoggedUser(profile, done);
            } else {
                done(new Error('Not allowed account'));
            }
        }
    ));
};
