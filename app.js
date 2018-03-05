const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const users = require('./routes/users');
const logger = require('express-logger');
const MongoStore = require('connect-mongo')(session);

//coneection to database
const configDB = require('./config/database.js');
mongoose.Promise = require('bluebird');
mongoose.connect(configDB.url, { promiseLibrary: require('bluebird') })
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));
let db = mongoose.connection;

require('./config/passport')(passport); // pass passport for configuration

//configure Express
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
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

// add routers
app.use('/', users);

module.exports = app;