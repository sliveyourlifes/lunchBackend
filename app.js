const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const appRoutes = require('./routes/app-routes');
const passportRoutes = require('./routes/passport-routes');
const logger = require('express-logger');
const MongoStore = require('connect-mongo')(session);


const configDB = require('./config/database.js');
mongoose.Promise = require('bluebird');
mongoose.connect(configDB.url, { promiseLibrary: require('bluebird') })
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));
let db = mongoose.connection;

require('./config/passport')(passport); 


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


app.use('/', appRoutes);
app.use('/', passportRoutes);


module.exports = app;