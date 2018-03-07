const passport = require('passport');
const YandexStrategy = require('passport-yandex').Strategy;
const Users = require('./../models/Users.js');


module.exports = function(passport) {
    //credentials for Yandex
    const YANDEX_CLIENT_ID = "cd85db83d6914976ba839957733ab2dc"
    const YANDEX_CLIENT_SECRET = "a8549941e9304ac6982808c2cb1a2b3a";

    // Passport session setup.
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    
    passport.deserializeUser(function(id, done) {
        Users.findById(id, function(err,user){
        err 
            ? done(err)
            : done(null,user);
        });
    });
    
    passport.use(new YandexStrategy({
                clientID: YANDEX_CLIENT_ID,
                clientSecret: YANDEX_CLIENT_SECRET,
                callbackURL: "http://localhost:3000/auth/yandex/callback"
            },
            function(accessToken, refreshToken, profile, done) {
                if(~profile.username.indexOf('@rednavis.com')){
                    Users.findOneAndUpdate({ profileId: profile.id }, { profile: profile._json },{ new: true , upsert: true } ,function (err, user) {
                        if (err) return new Error(err);
                        return done(err, user);
                        });
                }
                else {
                    console.log('bad connection')
                }
                
            }
    ));
}


