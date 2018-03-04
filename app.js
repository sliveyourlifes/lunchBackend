const express = require('express');
const app = express();
const passport = require('passport');
const YandexStrategy = require('passport-yandex').Strategy;
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const users = require('./routes/users');
const logger = require('express-logger');
const MongoStore = require('connect-mongo')(session);
const Users = require('./models/Users.js');

//coneection to database
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/usersDatabase', { promiseLibrary: require('bluebird') })
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));
let db = mongoose.connection;


//credentials for Yandex
const YANDEX_CLIENT_ID = "cd85db83d6914976ba839957733ab2dc"
const YANDEX_CLIENT_SECRET = "a8549941e9304ac6982808c2cb1a2b3a";

// Use the YandexStrategy within Passport.

passport.use(new YandexStrategy({
        clientID: YANDEX_CLIENT_ID,
        clientSecret: YANDEX_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/yandex/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        // console.log(accessToken)
        // console.log(refreshToken)
        // console.log(profile)
        Users.findOrCreate({ profileId: profile.id }, { profile: profile._json },{ new: true , upsert: true } ,function (err, user) {
          if (err) return new Error(err);
          return done(err, user);
        });
    }
));

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

// CORS middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//configure Express
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger({path: "./logs/log.txt"}));
app.use(cookieParser());
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  cookie: { path: '/', httpOnly: true, maxAge: 1000*60*60*24 },
  store: new MongoStore({
       mongooseConnection: db
   })
}));

app.use(passport.initialize());
app.use(passport.session());

// app.use('/', (req, res, next)=>{
//     req.session.userId = '5a8feed83ba7a01c3fd6019d';
//   next();
// });
app.use('/', users);

module.exports = app;